import axios from 'axios';
import config from '../config/environment.js';
import { AppError } from '../middleware/errorHandler.js';

class SocialMediaService {
  
  // 🔗 Conectar red social
  async conectarRedSocial(usuario, redSocial, token, datosUsuario) {
    try {
      if (!config.socialMedia[redSocial]?.enabled) {
        throw new AppError(`Integración con ${redSocial} no está habilitada`, 400);
      }

      // Validar token con la API de la red social
      const tokenValido = await this.validarToken(redSocial, token);
      
      if (!tokenValido) {
        throw new AppError(`Token de ${redSocial} inválido o expirado`, 401);
      }

      // Actualizar datos del usuario
      usuario.redesSociales[redSocial] = {
        id: datosUsuario.id,
        token: token,
        configurado: true,
        permisos: ['publish', 'read'],
        ultimaConexion: new Date(),
        ...this.extraerDatosRedSocial(redSocial, datosUsuario)
      };

      // Actualizar estadísticas
      usuario.estadisticasRedes.redesConectadas = usuario.obtenerRedesConectadas().length;
      await usuario.save();

      return {
        success: true,
        message: `${redSocial} conectada exitosamente`,
        datos: datosUsuario
      };
    } catch (error) {
      console.error(`Error conectando ${redSocial}:`, error);
      throw new AppError(`Error al conectar ${redSocial}: ${error.message}`, 500);
    }
  }

  // 📤 Publicar en redes sociales
  async publicarEnRedes(usuario, publicacionData) {
    const { redes, mensaje, imagenUrl, tipoContenido, plantaId } = publicacionData;
    const resultados = [];

    for (const redSocial of redes) {
      if (!usuario.puedePublicarEn(redSocial)) {
        resultados.push({
          redSocial,
          success: false,
          error: `No tiene permisos para publicar en ${redSocial}`
        });
        continue;
      }

      try {
        const resultado = await this.publicarEnRedSocial(usuario, redSocial, {
          mensaje,
          imagenUrl,
          tipoContenido,
          plantaId
        });
        resultados.push({ redSocial, success: true, ...resultado });
      } catch (error) {
        resultados.push({
          redSocial,
          success: false,
          error: error.message
        });
      }
    }

    return resultados;
  }

  // 🔐 Validar token
  async validarToken(redSocial, token) {
    try {
      switch (redSocial) {
        case 'facebook':
          const fbResponse = await axios.get(
            `https://graph.facebook.com/v18.0/me?access_token=${token}`
          );
          return fbResponse.data.id !== undefined;

        case 'instagram':
          const igResponse = await axios.get(
            `https://graph.instagram.com/me?access_token=${token}`
          );
          return igResponse.data.id !== undefined;

        case 'twitter':
          // Twitter usa OAuth 1.0a - más complejo
          return await this.validarTokenTwitter(token);

        default:
          // Para desarrollo, en producción debería validarse
          return process.env.NODE_ENV === 'development';
      }
    } catch (error) {
      console.error(`Error validando token de ${redSocial}:`, error);
      return false;
    }
  }

  // 🐦 Validar token de Twitter (OAuth 1.0a)
  async validarTokenTwitter(token) {
    try {
      // Twitter requiere firma OAuth 1.0a
      // Esta es una implementación simplificada
      const response = await axios.get(
        'https://api.twitter.com/2/users/me',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data.data !== undefined;
    } catch (error) {
      return false;
    }
  }

  // 📊 Obtener métricas de redes
  async obtenerMetricasRedes(usuario) {
    const metricas = {};
    const redesConectadas = usuario.obtenerRedesConectadas();

    for (const redSocial of redesConectadas) {
      try {
        const red = usuario.redesSociales[redSocial];
        const metricasRed = await this.obtenerMetricasRedSocial(redSocial, red.token);
        metricas[redSocial] = metricasRed;
      } catch (error) {
        console.error(`Error obteniendo métricas de ${redSocial}:`, error);
        metricas[redSocial] = { error: error.message };
      }
    }

    return metricas;
  }

  // 🔄 Sincronizar todas las redes
  async sincronizarRedesUsuario(usuario) {
    const resultados = {};
    const redesConectadas = usuario.obtenerRedesConectadas();

    for (const redSocial of redesConectadas) {
      try {
        // Actualizar token si es necesario
        const tokenActualizado = await this.actualizarToken(redSocial, usuario.redesSociales[redSocial].token);
        if (tokenActualizado) {
          usuario.redesSociales[redSocial].token = tokenActualizado;
          usuario.redesSociales[redSocial].ultimaConexion = new Date();
        }

        // Obtener métricas actualizadas
        const metricas = await this.obtenerMetricasRedSocial(redSocial, usuario.redesSociales[redSocial].token);
        resultados[redSocial] = { success: true, metricas };
      } catch (error) {
        resultados[redSocial] = { success: false, error: error.message };
      }
    }

    await usuario.save();
    return resultados;
  }

  // 🎯 Métodos específicos para cada red social
  async publicarEnFacebook(token, mensaje, imagenUrl) {
    let postData = { message: mensaje, access_token: token };

    // Si hay imagen, subirla primero
    if (imagenUrl) {
      const photoResponse = await axios.post(
        `https://graph.facebook.com/v18.0/me/photos`,
        {
          url: imagenUrl,
          caption: mensaje,
          access_token: token
        }
      );
      return {
        id: photoResponse.data.id,
        url: `https://facebook.com/photo.php?fbid=${photoResponse.data.id}`,
        tipo: 'foto'
      };
    } else {
      // Solo texto
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/me/feed`,
        postData
      );
      return {
        id: response.data.id,
        url: `https://facebook.com/${response.data.id}`,
        tipo: 'texto'
      };
    }
  }

  async publicarEnInstagram(token, mensaje, imagenUrl) {
    if (!imagenUrl) {
      throw new AppError('Instagram requiere una imagen para publicar', 400);
    }

    // Instagram requiere un proceso de 2 pasos
    // 1. Crear contenedor de media
    const containerResponse = await axios.post(
      `https://graph.instagram.com/me/media`,
      {
        image_url: imagenUrl,
        caption: mensaje.substring(0, 2200), // Límite de Instagram
        access_token: token
      }
    );

    // 2. Publicar el contenedor
    const publishResponse = await axios.post(
      `https://graph.instagram.com/${containerResponse.data.id}/publish`,
      {
        access_token: token
      }
    );

    return {
      id: publishResponse.data.id,
      url: `https://instagram.com/p/${publishResponse.data.id}`,
      tipo: 'foto'
    };
  }

  async publicarEnTwitter(token, mensaje, imagenUrl) {
    // Twitter API v2 con OAuth 2.0
    const tweetData = {
      text: mensaje.substring(0, 280) // Límite de Twitter
    };

    const response = await axios.post(
      `https://api.twitter.com/2/tweets`,
      tweetData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      id: response.data.data.id,
      url: `https://twitter.com/user/status/${response.data.data.id}`,
      tipo: 'tweet'
    };
  }

  // 🎨 Extraer datos específicos de cada red
  extraerDatosRedSocial(redSocial, datosUsuario) {
    const extractores = {
      facebook: {
        nombre: datosUsuario.name,
        email: datosUsuario.email,
        picture: datosUsuario.picture?.data?.url
      },
      instagram: {
        username: datosUsuario.username,
        nombreCompleto: datosUsuario.name,
        profile_picture: datosUsuario.profile_picture
      },
      tiktok: {
        username: datosUsuario.username,
        nombreMostrar: datosUsuario.display_name,
        avatar: datosUsuario.avatar_url
      },
      twitter: {
        username: datosUsuario.screen_name,
        nombre: datosUsuario.name,
        profile_image_url: datosUsuario.profile_image_url
      }
    };

    return extractores[redSocial] || {};
  }

  // 📝 Generar mensaje optimizado
  generarMensajeOptimizado(mensajeBase, redSocial, tipoContenido, planta) {
    const limites = config.autoPublish.content.maxLength;
    const limite = limites[redSocial] || 280;

    let mensaje = mensajeBase;

    // Acortar si es necesario
    if (mensaje.length > limite) {
      mensaje = mensaje.substring(0, limite - 3) + '...';
    }

    // Agregar hashtags según la red social
    const hashtags = this.generarHashtags(tipoContenido, planta, redSocial);
    const mensajeConHashtags = `${mensaje}\n\n${hashtags}`;

    // Verificar que no exceda el límite con hashtags
    return mensajeConHashtags.length > limite ? mensaje : mensajeConHashtags;
  }

  generarHashtags(tipoContenido, planta, redSocial) {
    const baseTags = ['PlantasPapaloapan', 'JardineriaMexicana'];
    
    const tagsPorContenido = {
      crecimiento: ['Crecimiento', 'Desarrollo', 'Progreso'],
      cosecha: ['Cosecha', 'Frutas', 'AlimentosNaturales'],
      floracion: ['Floracion', 'Flores', 'BellezaNatural'],
      cuidado: ['CuidadoPlantas', 'Jardineria', 'Consejos'],
      logro: ['Logro', 'MetaCumplida', 'Éxito']
    };

    const tagsEspecificos = tagsPorContenido[tipoContenido] || [];
    const tagsEspecie = planta?.especieId?.nombreComun ? 
      [`#${planta.especieId.nombreComun.replace(/\s+/g, '')}`] : [];

    const todosHashtags = [...baseTags, ...tagsEspecificos, ...tagsEspecie];
    
    // Limitar cantidad según red social
    const limite = redSocial === 'twitter' ? 3 : 5;
    return todosHashtags.slice(0, limite).map(tag => `#${tag}`).join(' ');
  }
}

export default new SocialMediaService();