import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  plantaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Planta', 
    required: true 
  },
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  tipoTarea: { 
    type: String, 
    enum: ['Riego', 'Fertilización', 'Poda', 'Control Plagas', 'Trasplante', 'Monitoreo'],
    required: true 
  },
  descripcion: String,
  fechaProgramada: { 
    type: Date, 
    required: true 
  },
  fechaEjecucion: Date,
  estado: { 
    type: String, 
    enum: ['Pendiente', 'Completada', 'Atrasada', 'Cancelada'], 
    default: 'Pendiente' 
  },
  instrucciones: String,
  materialesRequeridos: [String],
  observaciones: String,
  prioridad: { 
    type: String, 
    enum: ['Baja', 'Media', 'Alta', 'Urgente'], 
    default: 'Media' 
  }
}, {
  timestamps: true
});

// Índices
tareaSchema.index({ usuarioId: 1, estado: 1 });
tareaSchema.index({ fechaProgramada: 1 });
tareaSchema.index({ plantaId: 1 });

// Middleware para actualizar estado
tareaSchema.pre('save', function(next) {
  if (this.estado === 'Pendiente' && this.fechaProgramada < new Date()) {
    this.estado = 'Atrasada';
  }
  next();
});

// Método estático
tareaSchema.statics.obtenerTareasProximas = function(usuarioId, dias = 3) {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() + dias);
  
  return this.find({
    usuarioId,
    estado: { $in: ['Pendiente', 'Atrasada'] },
    fechaProgramada: { $lte: fechaLimite }
  }).populate('plantaId', 'nombrePersonalizado especieId')
    .populate('plantaId.especieId', 'nombreComun')
    .sort({ fechaProgramada: 1, prioridad: -1 });
};

export default mongoose.model('Tarea', tareaSchema);