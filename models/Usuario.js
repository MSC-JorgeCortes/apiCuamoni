import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  // 📝 INFORMACIÓN BÁSICA
  nombre: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: false,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  biografia: {
    type: String,
    maxlength: 500,
    default: ''
  },

  // 📍 UBICACIÓN
  ubicacion: {
    municipio: String,
    localidad: String,
    estado: {
      type: String,
      default: 'Veracruz'
    },
    coordenadas: {
      type: { 
        type: String, 
        enum: ['Point'],
        required: false
      },
      coordinates: { 
        type: [Number], // [lng, lat]
        required: false 
      }
    },
    zona: {
      type: String,
      enum: ['Cuenca del Papaloapan', 'Otra'],
      default: 'Cuenca del Papaloapan'
    }
  },

  // 🔗 REDES SOCIALES
  redesSociales: {
    facebook: {
      id: String,
      token: String,
      email: String,
      nombre: String,
      configurado: { type: Boolean, default: false },
      permisos: [String],
      ultimaConexion: Date
    },
    instagram: {
      id: String,
      token: String,
      username: String,
      nombreCompleto: String,
      configurado: { type: Boolean, default: false },
      permisos: [String],
      ultimaConexion: Date
    },
    tiktok: {
      id: String,
      token: String,
      username: String,
      nombreMostrar: String,
      configurado: { type: Boolean, default: false },
      permisos: [String],
      ultimaConexion: Date
    },
    twitter: {
      id: String,
      token: String,
      username: String,
      nombre: String,
      configurado: { type: Boolean, default: false },
      permisos: [String],
      ultimaConexion: Date
    }
  },

  // ⚙️ CONFIGURACIÓN DE PUBLICACIÓN
  configuracionPublicacion: {
    publicarAutomaticamente: { type: Boolean, default: false },
    redesHabilitadas: {
      facebook: { type: Boolean, default: false },
      instagram: { type: Boolean, default: false },
      tiktok: { type: Boolean, default: false },
      twitter: { type: Boolean, default: false }
    },
    tiposEventos: {
      nuevoCrecimiento: { type: Boolean, default: true },
      cosecha: { type: Boolean, default: true },
      floracion: { type: Boolean, default: true },
      cuidadoEspecial: { type: Boolean, default: false },
      logro: { type: Boolean, default: true }
    },
    frecuenciaMaxima: {
      type: String,
      enum: ['diario', 'semanal', 'quincenal', 'mensual'],
      default: 'semanal'
    },
    formatoMensaje: {
      type: String,
      enum: ['formal', 'informal', 'tecnico', 'personal'],
      default: 'informal'
    },
    incluirHashtags: { type: Boolean, default: true },
    incluirUbicacion: { type: Boolean, default: true }
  },

  // 📊 HISTORIAL DE PUBLICACIONES
  historialPublicaciones: [{
    fecha: { type: Date, default: Date.now },
    redSocial: {
      type: String,
      enum: ['facebook', 'instagram', 'tiktok', 'twitter']
    },
    tipoContenido: {
      type: String,
      enum: ['crecimiento', 'cosecha', 'floracion', 'cuidado', 'logro', 'consejo']
    },
    mensaje: String,
    imagenUrl: String,
    idPublicacion: String,
    urlPublicacion: String,
    metricas: {
      meGusta: Number,
      comentarios: Number,
      compartidos: Number,
      vistas: Number
    },
    estado: {
      type: String,
      enum: ['publicado', 'error', 'programado', 'cancelado'],
      default: 'publicado'
    }
  }],

  // 📈 ESTADÍSTICAS
  estadisticasRedes: {
    totalPublicaciones: { type: Number, default: 0 },
    publicacionesEsteMes: { type: Number, default: 0 },
    seguidoresTotales: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
    redesConectadas: { type: Number, default: 0 }
  },

  // 🌿 PREFERENCIAS
  preferenciasContenido: {
    hashtagsPersonalizados: [String],
    mensajePersonalizado: String,
    mostrarNombreCientifico: { type: Boolean, default: false },
    compartirConsejosCuidado: { type: Boolean, default: true },
    mencionarEspecie: { type: Boolean, default: true },
    incluirDatosTecnicos: { type: Boolean, default: false }
  },

  // 🔒 PRIVACIDAD
  configuracionPrivacidad: {
    perfilPublico: { type: Boolean, default: true },
    mostrarUbicacion: { type: Boolean, default: true },
    mostrarEstadisticas: { type: Boolean, default: true },
    permitirMensajes: { type: Boolean, default: true }
  },

  // 📝 REFERENCIAS
  plantas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planta' }],
  seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  siguiendo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],

  // ⏰ METADATOS
  fechaRegistro: { type: Date, default: Date.now },
  ultimoAcceso: Date,
  estado: { 
    type: String, 
    enum: ['activo', 'inactivo', 'suspendido'], 
    default: 'activo' 
  },
  verificado: { type: Boolean, default: false },
  rol: { 
    type: String, 
    enum: ['usuario', 'experto', 'administrador'], 
    default: 'usuario' 
  }
}, {
  timestamps: true
});

// Índices
usuarioSchema.index({ "ubicacion.coordenadas": "2dsphere" });
usuarioSchema.index({ "redesSociales.facebook.id": 1 });
usuarioSchema.index({ "redesSociales.instagram.id": 1 });
usuarioSchema.index({ email: 1 }, { unique: true });

// Métodos
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

usuarioSchema.methods.compararPassword = async function(passwordCandidate) {
  return await bcrypt.compare(passwordCandidate, this.password);
};

usuarioSchema.methods.obtenerRedesConectadas = function() {
  const redes = [];
  if (this.redesSociales.facebook.configurado) redes.push('facebook');
  if (this.redesSociales.instagram.configurado) redes.push('instagram');
  if (this.redesSociales.tiktok.configurado) redes.push('tiktok');
  if (this.redesSociales.twitter.configurado) redes.push('twitter');
  return redes;
};

usuarioSchema.methods.puedePublicarEn = function(redSocial) {
  const red = this.redesSociales[redSocial];
  return red && red.configurado && red.permisos.includes('publish');
};

export default mongoose.model('Usuario', usuarioSchema);