// controllers/usuarioController.js
import Usuario from '../models/Usuario.js';
import Planta from '../models/Planta.js';
import Tarea from '../models/Tarea.js';
import SocialMediaService from '../services/socialMediaService.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

class UsuarioController {

  listarUsuarios = asyncHandler(async (req, res, next) => {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  });

  // Registrar usuario
  registrarUsuario = (async (req, res, next) => {
    try {
      const { nombre, email } = req.body;
      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ email: email });
      if (usuarioExistente) {
        res.json({error:'El email ya está registrado'});
      }else{
        const usuario = new Usuario({ nombre,email });
        await usuario.save();
        console.log('Usuario registrado:', usuario._id);
        res.json({id: usuario._id, nombre: usuario.nombre, email: usuario.email});
      }
    } catch (error) {
      res.json({error: 'Error al registrar usuario'});
    }
  });

  // 🔗 CONECTAR RED SOCIAL
  conectarRedSocial = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const { redSocial, token, datosUsuario } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const resultado = await SocialMediaService.conectarRedSocial(
      usuario, 
      redSocial, 
      token, 
      datosUsuario
    );

    if (!resultado.success) {
      throw new AppError(resultado.message, 400);
    }

    res.json({
      success: true,
      message: `${redSocial.charAt(0).toUpperCase() + redSocial.slice(1)} conectada exitosamente`,
      data: {
        redSocial,
        configurado: true,
        username: datosUsuario.username || datosUsuario.nombre
      }
    });
  });

  // 🔓 DESCONECTAR RED SOCIAL
  desconectarRedSocial = asyncHandler(async (req, res, next) => {
    const { usuarioId, redSocial } = req.params;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Resetear configuración de la red social
    usuario.redesSociales[redSocial] = {
      configurado: false,
      token: null,
      id: null,
      permisos: []
    };

    // Actualizar configuración de publicación
    usuario.configuracionPublicacion.redesHabilitadas[redSocial] = false;

    await usuario.save();

    res.json({
      success: true,
      message: `${redSocial} desconectada exitosamente`
    });
  });

  // ⚙️ CONFIGURAR PUBLICACIÓN AUTOMÁTICA
  configurarPublicacionAutomatica = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const configuracion = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Validar que tenga al menos una red social conectada
    const redesConectadas = usuario.obtenerRedesConectadas();
    if (redesConectadas.length === 0 && configuracion.publicarAutomaticamente) {
      throw new AppError('Debes conectar al menos una red social para habilitar publicación automática', 400);
    }

    // Actualizar configuración
    usuario.configuracionPublicacion = {
      ...usuario.configuracionPublicacion,
      ...configuracion
    };

    await usuario.save();

    res.json({
      success: true,
      message: 'Configuración de publicación automática actualizada',
      data: usuario.configuracionPublicacion
    });
  });

  // 📱 PUBLICAR EN REDES SOCIALES
  publicarEnRedes = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const { 
      redes, 
      mensaje, 
      imagenUrl, 
      tipoContenido, 
      plantaId 
    } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Obtener datos de la planta si se especifica
    let planta = null;
    if (plantaId) {
      planta = await Planta.findById(plantaId).populate('especieId');
      if (!planta) {
        throw new AppError('Planta no encontrada', 404);
      }
    }

    const resultados = await SocialMediaService.publicarEnRedes(usuario, {
      redes,
      mensaje,
      imagenUrl,
      tipoContenido,
      plantaId: planta?._id
    });

    res.json({
      success: true,
      message: 'Publicación procesada',
      data: {
        publicaciones: resultados,
        total: resultados.length,
        exitosas: resultados.filter(r => r.success).length
      }
    });
  });

  // 📊 OBTENER ESTADÍSTICAS DE REDES
  obtenerEstadisticasRedes = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const metricasActualizadas = await SocialMediaService.obtenerMetricasRedes(usuario);

    res.json({
      success: true,
      data: {
        estadisticasGenerales: usuario.estadisticasRedes,
        redesConectadas: usuario.obtenerRedesConectadas(),
        configuracion: usuario.configuracionPublicacion,
        metricasActualizadas,
        historialReciente: usuario.historialPublicaciones
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 10)
      }
    });
  });

  // 🔍 OBTENER USUARIO
  obtenerUsuario = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;

    const usuario = await Usuario.findById(usuarioId)
      .select('-password')
      .populate('plantas', 'nombrePersonalizado estadoActual');

    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    res.json({
      success: true,
      data: usuario
    });
  });

  // ✏️ ACTUALIZAR USUARIO
  actualizarUsuario = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const updateData = req.body;

    // No permitir actualizar campos sensibles directamente
    const { password, email, ...safeUpdateData } = updateData;

    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      safeUpdateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuario
    });
  });

  // 🔍 OBTENER PLANTAS DEL USUARIO
  obtenerPlantasUsuario = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const { pagina = 1, limite = 10 } = req.query;

    const skip = (pagina - 1) * limite;

    const plantas = await Planta.find({ usuarioId })
      .populate('especieId', 'nombreComun nombreCientifico')
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(parseInt(limite));

    const total = await Planta.countDocuments({ usuarioId });

    res.json({
      success: true,
      data: plantas,
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total,
        paginas: Math.ceil(total / limite)
      }
    });
  });

  // 📊 OBTENER ESTADÍSTICAS
  obtenerEstadisticas = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;

    const [totalPlantas, plantasPorSalud, tareasPendientes] = await Promise.all([
      Planta.countDocuments({ usuarioId }),
      Planta.aggregate([
        { $match: { usuarioId } },
        { $group: { _id: '$estadoActual.salud', count: { $sum: 1 } } }
      ]),
      Tarea.countDocuments({ usuarioId, estado: 'Pendiente' })
    ]);

    res.json({
      success: true,
      data: {
        totalPlantas,
        distribucionSalud: plantasPorSalud.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        tareasPendientes
      }
    });
  });
}

export default new UsuarioController();