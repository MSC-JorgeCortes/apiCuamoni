import Joi from 'joi';

export const validarPlanta = (req, res, next) => {
  const schema = Joi.object({
    usuarioId: Joi.string().hex().length(24).required(),
    especieId: Joi.string().hex().length(24).required(),
    nombrePersonalizado: Joi.string().min(1).max(100).required(),
    fechaSiembra: Joi.date().max('now').required(),
    ubicacionSiembra: Joi.object({
      tipo: Joi.string().valid('Maceta', 'Jardin', 'Campo', 'Invernadero').required(),
      descripcion: Joi.string().max(200),
      coordenadas: Joi.object({
        lat: Joi.number().min(-90).max(90),
        lng: Joi.number().min(-180).max(180)
      }),
      direccion: Joi.string().max(300)
    }).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de planta inválidos',
      error: error.details[0].message
    });
  }
  next();
};

export const validarEspecie = (req, res, next) => {
  const schema = Joi.object({
    nombreCientifico: Joi.string().min(3).max(100).required(),
    nombreComun: Joi.string().min(2).max(50).required(),
    familia: Joi.string().max(50).required(),
    origen: Joi.string().max(100).default('Endémico de la cuenca del Papaloapan'),
    descripcion: Joi.string().max(1000),
    estadoConservacion: Joi.string().max(50)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de especie inválidos',
      error: error.details[0].message
    });
  }
  next();
};

export const validarCuidados = (req, res, next) => {
  const schema = Joi.object({
    etapa: Joi.string().required(),
    rangoEdadMeses: Joi.object({
      min: Joi.number().min(0).required(),
      max: Joi.number().min(0).required()
    }).required(),
    riego: Joi.object({
      cantidadAgua: Joi.string().required(),
      frecuencia: Joi.string().required(),
      observaciones: Joi.string()
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de cuidados inválidos',
      error: error.details[0].message
    });
  }
  next();
};