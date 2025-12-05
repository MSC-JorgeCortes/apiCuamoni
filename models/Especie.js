import mongoose from 'mongoose';

const especieSchema = new mongoose.Schema({
  nombreCientifico: {type: String, required: true,trim: true,unique: true},
  nombreComun: {type: String, required: true,trim: true},
  familia: {type: String, required: true, trim: true},
  origen: { type: String, default: "Endémico de la cuenca del Papaloapan"},
  descripcion: String,
  caracteristicas: { 
    alturaMaxima: Number, diametroMaximo: Number,  
    tipoCrecimiento: { type: String, enum: ['Rápido', 'Medio', 'Lento','Moderado','Muy rápido','Muy rápido']},
    longevidad: { type: String, enum: ['Anual', 'Perenne', 'Bianual'] }
  },
  requisitosAmbientales: { tipoSuelo: [String], phSuelo: { min: Number, max: Number},
    exposicionSolar: {
      type: String,
      enum: ['Sol pleno', 'Sombra parcial', 'Ambos','Sol pleno a media sombra','Media sombra a sol pleno','Media sombra']
    },
    humedadAmbiente: {
      type: String,
      enum: ['Alta', 'Media', 'Baja','Media-Alta','Baja-Media','Muy alta']
    },
    temperatura: {
      min: Number,
      max: Number
    }
  },
  cuidadosPorEdad: [{
    etapa: String,
    rangoEdadMeses: {
      min: Number,
      max: Number
    },
    riego: {
      cantidadAgua: String,
      frecuencia: String,
      observaciones: String,
      frecuenciaDias: Number
    },
    fertilizacion: {
      tipoFertilizante: String,
      cantidad: String,
      frecuencia: Number,
      epocaAplicacion: String
    },
    poda: {
      requiere: Boolean,
      tipo: String,
      frecuencia: Number,
      epocaRecomendada: [String]
    },
    trasplante: {
      requiere: Boolean,
      epocaRecomendada: String,
      tipoMaceta: String
    },
    protecciones: [String]
  }],
  plagasComunes: [String],
  epocaFloracion: String,
  epocaFructificacion: String,
  usosTradicionales: [String],
  estadoConservacion: String,
  fotos: [{
    url: String,
    descripcion: String,
    tipo: {
      type: String,
      enum: ['flor', 'fruto', 'hoja', 'planta_completa', 'general'],
      default: 'general'
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  }],
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices
especieSchema.index({ nombreComun: 'text', nombreCientifico: 'text', familia: 'text' });
especieSchema.index({ familia: 1 });
especieSchema.index({ origen: 1 });

export default mongoose.model('Especie', especieSchema);