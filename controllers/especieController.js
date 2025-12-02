// controllers/especieController.js
import Especie from '../models/Especie.js';
import Planta from '../models/Planta.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

class EspecieController {
  
  // 🔍 GET - Obtener todas las especies
  obtenerTodasEspecies = asyncHandler(async (req, res, next) => {
    const { 
      pagina = 1, 
      limite = 50, 
      familia, 
      origen,
      sortBy = 'nombreComun',
      sortOrder = 'asc'
    } = req.query;

    const skip = (pagina - 1) * limite;
    
    let filtro = {};
    if (familia) filtro.familia = new RegExp(familia, 'i');
    if (origen) filtro.origen = new RegExp(origen, 'i');

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const especies = await Especie.find(filtro)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limite))
      .select('-cuidadosPorEdad');

    const total = await Especie.countDocuments(filtro);

    res.json({
      success: true,
      data: especies,
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total,
        paginas: Math.ceil(total / limite)
      }
    });
  });

  // 🔍 GET - Buscar especies por término
  buscarEspecies = asyncHandler(async (req, res, next) => {
    const { q, campo = 'todos' } = req.query;
    
    if (!q) {
      throw new AppError('Término de búsqueda requerido', 400);
    }

    let filtro = {};
    const regex = new RegExp(q, 'i');

    switch (campo) {
      case 'nombreComun':
        filtro.nombreComun = regex;
        break;
      case 'nombreCientifico':
        filtro.nombreCientifico = regex;
        break;
      case 'familia':
        filtro.familia = regex;
        break;
      case 'todos':
      default:
        filtro = {
          $or: [
            { nombreComun: regex },
            { nombreCientifico: regex },
            { familia: regex }
          ]
        };
    }

    const especies = await Especie.find(filtro)
      .select('nombreComun nombreCientifico familia origen estadoConservacion')
      .limit(50);

    res.json({
      success: true,
      data: especies,
      total: especies.length,
      termino: q
    });
  });

  // 🔍 GET - Obtener estadísticas de especies
  obtenerEstadisticasEspecies = asyncHandler(async (req, res, next) => {
    const totalEspecies = await Especie.countDocuments();
    
    const especiesPorFamilia = await Especie.aggregate([
      { $group: { _id: '$familia', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const especiesPorOrigen = await Especie.aggregate([
      { $group: { _id: '$origen', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalEspecies,
        distribucion: {
          porFamilia: especiesPorFamilia,
          porOrigen: especiesPorOrigen
        }
      }
    });
  });

  // 🔍 GET - Obtener categorías disponibles
  obtenerCategorias = asyncHandler(async (req, res, next) => {
    const familias = await Especie.distinct('familia');
    const origenes = await Especie.distinct('origen');
    const tiposCrecimiento = await Especie.distinct('caracteristicas.tipoCrecimiento');
    const estadosConservacion = await Especie.distinct('estadoConservacion');

    res.json({
      success: true,
      data: {
        familias: familias.sort(),
        origenes: origenes.sort(),
        tiposCrecimiento: tiposCrecimiento.filter(Boolean).sort(),
        estadosConservacion: estadosConservacion.filter(Boolean).sort()
      }
    });
  });

  // 🔍 GET - Obtener especie específica con detalles completos
  obtenerEspecieDetallada = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;

    const especie = await Especie.findById(especieId);
    
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    const totalPlantas = await Planta.countDocuments({ especieId });

    res.json({
      success: true,
      data: {
        ...especie.toObject(),
        estadisticas: { totalPlantas }
      }
    });
  });

  // 🔍 GET - Obtener especies por familia
  obtenerEspeciesPorFamilia = asyncHandler(async (req, res, next) => {
    const { familia } = req.params;
    const { pagina = 1, limite = 20 } = req.query;

    const skip = (pagina - 1) * limite;

    const especies = await Especie.find({ 
      familia: new RegExp(familia, 'i') 
    })
    .sort({ nombreComun: 1 })
    .skip(skip)
    .limit(parseInt(limite))
    .select('nombreComun nombreCientifico familia origen estadoConservacion');

    const total = await Especie.countDocuments({ 
      familia: new RegExp(familia, 'i') 
    });

    res.json({
      success: true,
      data: especies,
      familia,
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total,
        paginas: Math.ceil(total / limite)
      }
    });
  });

  // 🔍 GET - Obtener especies por origen
  obtenerEspeciesPorOrigen = asyncHandler(async (req, res, next) => {
    const { origen } = req.params;
    const { pagina = 1, limite = 20 } = req.query;

    const skip = (pagina - 1) * limite;

    const especies = await Especie.find({ 
      origen: new RegExp(origen, 'i') 
    })
    .sort({ nombreComun: 1 })
    .skip(skip)
    .limit(parseInt(limite))
    .select('nombreComun nombreCientifico familia origen estadoConservacion');

    const total = await Especie.countDocuments({ 
      origen: new RegExp(origen, 'i') 
    });

    res.json({
      success: true,
      data: especies,
      origen,
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total,
        paginas: Math.ceil(total / limite)
      }
    });
  });

  // 🔍 GET - Obtener cuidados específicos por edad
  obtenerCuidadosPorEdad = asyncHandler(async (req, res, next) => {
    const { especieId, edadMeses } = req.params;
    const edad = parseInt(edadMeses);

    if (isNaN(edad) || edad < 0) {
      throw new AppError('Edad debe ser un número positivo', 400);
    }

    const especie = await Especie.findById(especieId);
    
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    // Encontrar cuidados para la edad específica
    const cuidados = especie.cuidadosPorEdad.find(c => 
      edad >= c.rangoEdadMeses.min && edad <= c.rangoEdadMeses.max
    );

    if (!cuidados) {
      throw new AppError(`No se encontraron cuidados para edad ${edad} meses`, 404);
    }

    res.json({
      success: true,
      data: {
        especie: especie.nombreComun,
        edadMeses: edad,
        etapa: cuidados.etapa,
        cuidados: cuidados
      }
    });
  });

  // 🔍 GET - Obtener plantas registradas de una especie
  obtenerPlantasRegistradas = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const { pagina = 1, limite = 10, salud } = req.query;

    const skip = (pagina - 1) * limite;

    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    let filtro = { especieId };
    if (salud) filtro['estadoActual.salud'] = salud;

    const plantas = await Planta.find(filtro)
      .populate('usuarioId', 'nombre')
      .sort({ fechaSiembra: -1 })
      .skip(skip)
      .limit(parseInt(limite))
      .select('nombrePersonalizado estadoActual fechaSiembra ubicacionSiembra');

    const total = await Planta.countDocuments(filtro);

    res.json({
      success: true,
      data: {
        especie: {
          nombreComun: especie.nombreComun,
          nombreCientifico: especie.nombreCientifico
        },
        plantas,
        total
      },
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total,
        paginas: Math.ceil(total / limite)
      }
    });
  });

  // 📝 POST - Crear nueva especie
  crearEspecie = asyncHandler(async (req, res, next) => {
    const especieData = req.body;

    const especieExistente = await Especie.findOne({
      nombreCientifico: especieData.nombreCientifico
    });

    if (!especieExistente) {
      throw new AppError('Ya existe una especie con este nombre científico', 400);
    }

    const nuevaEspecie = new Especie(especieData);
    await nuevaEspecie.save();

    res.status(201).json({
      success: true,
      message: 'Especie creada exitosamente',
      data: nuevaEspecie
    });
  });

  // 📝 POST - Agregar cuidados a una especie
  agregarCuidadosEspecie = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const cuidadosData = req.body;

    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    especie.cuidadosPorEdad.push(cuidadosData);
    especie.fechaActualizacion = new Date();

    await especie.save();

    res.status(201).json({
      success: true,
      message: 'Cuidados agregados exitosamente',
      data: cuidadosData
    });
  });

  // 📝 POST - Agregar foto a especie
  agregarFotoEspecie = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const { url, descripcion, tipo } = req.body;

    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    if (!especie.fotos) especie.fotos = [];
    
    especie.fotos.push({
      url,
      descripcion,
      tipo: tipo || 'general',
      fecha: new Date()
    });

    especie.fechaActualizacion = new Date();
    await especie.save();

    res.status(201).json({
      success: true,
      message: 'Foto agregada exitosamente',
      data: { url, descripcion, tipo }
    });
  });

  // ✏️ PUT - Actualizar especie completa
  actualizarEspecie = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const updateData = req.body;

    const especie = await Especie.findByIdAndUpdate(
      especieId,
      {
        ...updateData,
        fechaActualizacion: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Especie actualizada exitosamente',
      data: especie
    });
  });

  // ✏️ PUT - Actualizar cuidados específicos
  actualizarCuidados = asyncHandler(async (req, res, next) => {
    const { especieId, cuidadoId } = req.params;
    const updateData = req.body;

    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    const cuidadoIndex = especie.cuidadosPorEdad.findIndex(
      c => c._id.toString() === cuidadoId
    );

    if (cuidadoIndex === -1) {
      throw new AppError('Cuidado no encontrado', 404);
    }

    // Actualizar cuidados
    especie.cuidadosPorEdad[cuidadoIndex] = {
      ...especie.cuidadosPorEdad[cuidadoIndex].toObject(),
      ...updateData
    };

    especie.fechaActualizacion = new Date();
    await especie.save();

    res.json({
      success: true,
      message: 'Cuidados actualizados exitosamente',
      data: especie.cuidadosPorEdad[cuidadoIndex]
    });
  });

  // ✏️ PUT - Actualizar estado de conservación
  actualizarEstadoConservacion = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const { estadoConservacion, observaciones } = req.body;

    const especie = await Especie.findByIdAndUpdate(
      especieId,
      {
        estadoConservacion,
        observacionesConservacion: observaciones,
        fechaActualizacion: new Date()
      },
      { new: true }
    );

    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Estado de conservación actualizado',
      data: {
        estadoConservacion: especie.estadoConservacion,
        observaciones: especie.observacionesConservacion
      }
    });
  });

  // 🔄 PATCH - Actualizar solo nombres
  actualizarNombres = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const { nombreComun, nombreCientifico } = req.body;

    const especie = await Especie.findByIdAndUpdate(
      especieId,
      {
        nombreComun,
        nombreCientifico,
        fechaActualizacion: new Date()
      },
      { new: true }
    );

    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Nombres actualizados exitosamente',
      data: {
        nombreComun: especie.nombreComun,
        nombreCientifico: especie.nombreCientifico
      }
    });
  });

  // 🔄 PATCH - Actualizar descripción
  actualizarDescripcion = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const { descripcion, usosTradicionales } = req.body;

    const updateData = {};
    if (descripcion) updateData.descripcion = descripcion;
    if (usosTradicionales) updateData.usosTradicionales = usosTradicionales;

    const especie = await Especie.findByIdAndUpdate(
      especieId,
      {
        ...updateData,
        fechaActualizacion: new Date()
      },
      { new: true }
    );

    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Descripción actualizada exitosamente',
      data: {
        descripcion: especie.descripcion,
        usosTradicionales: especie.usosTradicionales
      }
    });
  });

  // 🔄 PATCH - Actualizar requisitos ambientales
  actualizarRequisitos = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;
    const requisitos = req.body;

    const especie = await Especie.findByIdAndUpdate(
      especieId,
      {
        requisitosAmbientales: requisitos,
        fechaActualizacion: new Date()
      },
      { new: true }
    );

    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Requisitos ambientales actualizados',
      data: especie.requisitosAmbientales
    });
  });

  // 🗑️ DELETE - Eliminar especie
  eliminarEspecie = asyncHandler(async (req, res, next) => {
    const { especieId } = req.params;

    // Verificar si hay plantas asociadas
    const plantasAsociadas = await Planta.countDocuments({ especieId });
    
    if (plantasAsociadas > 0) {
      throw new AppError(
        `No se puede eliminar la especie porque tiene ${plantasAsociadas} plantas asociadas. Elimine primero las plantas.`,
        400
      );
    }

    const especie = await Especie.findByIdAndDelete(especieId);

    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Especie eliminada exitosamente',
      data: { 
        id: especieId, 
        nombre: especie.nombreComun 
      }
    });
  });

  // 🗑️ DELETE - Eliminar foto de especie
  eliminarFotoEspecie = asyncHandler(async (req, res, next) => {
    const { especieId, fotoId } = req.params;

    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    especie.fotos = especie.fotos.filter(foto => 
      foto._id.toString() !== fotoId
    );

    especie.fechaActualizacion = new Date();
    await especie.save();

    res.json({
      success: true,
      message: 'Foto eliminada exitosamente',
      data: { fotoId }
    });
  });

  // 🗑️ DELETE - Eliminar cuidados
  eliminarCuidados = asyncHandler(async (req, res, next) => {
    const { especieId, cuidadoId } = req.params;

    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    especie.cuidadosPorEdad = especie.cuidadosPorEdad.filter(
      c => c._id.toString() !== cuidadoId
    );

    especie.fechaActualizacion = new Date();
    await especie.save();

    res.json({
      success: true,
      message: 'Cuidados eliminados exitosamente',
      data: { cuidadoId }
    });
  });
}

export default new EspecieController();