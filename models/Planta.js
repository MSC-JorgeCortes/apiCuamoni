import mongoose from 'mongoose';

const plantaSchema = new mongoose.Schema({
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  especieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Especie', 
    required: true 
  },
  nombrePersonalizado: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  fechaSiembra: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  ubicacionSiembra: {
    tipo: {
      type: String,
      enum: ['Maceta', 'Jardin', 'Campo', 'Invernadero'],
      required: true
    },
    descripcion: String,
    coordenadas: {
      type: { 
        type: String, 
        enum: ['Point'],
        required: true
      },
      coordinates: { 
        type: [Number], // [lng, lat]
        required: true 
      } 
    },
    direccion: String
  },
  estadoActual: {
    salud: {
      type: String,
      enum: ['Excelente', 'Bueno', 'Regular', 'Malo'],
      default: 'Bueno'
    },
    altura: {
      type: Number,
      min: 0,
      default: 0
    },
    diametroTallo: {
      type: Number,
      min: 0,
      default: 0
    },
    observaciones: String
  },
  historialCuidados: [{
    fecha: { 
      type: Date, 
      default: Date.now 
    },
    tipoCuidado: {
      type: String,
      enum: ['Riego', 'Fertilización', 'Poda', 'Control Plagas', 'Trasplante', 'Otro']
    },
    descripcion: String,
    cantidadAplicada: String,
    observaciones: String,
    usuarioResponsable: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Usuario' 
    }
  }],
  registroCrecimiento: [{
    fecha: { 
      type: Date, 
      default: Date.now 
    },
    altura: Number,
    diametroTallo: Number,
    numeroHojas: Number,
    observaciones: String,
    fotos: [String]
  }],
  alertasConfiguradas: {
    proximoRiego: Date,
    proximaFertilizacion: Date,
    proximaPoda: Date,
    recordatorios: [String]
  }
}, {
  timestamps: true
});

// Índices
plantaSchema.index({ usuarioId: 1 });
plantaSchema.index({ especieId: 1 });
plantaSchema.index({ "ubicacionSiembra.coordenadas": "2dsphere" });

//Virtual para edad en meses
plantaSchema.virtual('edadMeses').get(function() {
  console.log('fechaSiembra:', this.especieId);
  const diffMs = Date.now() - this.fechaSiembra.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
});



plantaSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Planta', plantaSchema);