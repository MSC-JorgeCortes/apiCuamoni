// controllers/plantaController.js
import Planta from '../models/Planta.js';
import Especie from '../models/Especie.js';
import Tarea from '../models/Tarea.js';
import WebSocketService from '../services/websocketService.js';
import AlertaService from '../services/alertaService.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

class PlantaController {
  
  // 🔍 GET - Obtener todas las plantas de un usuario
  obtenerPlantasUsuario = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const { pagina = 1, limite = 10, estadoSalud, especie } = req.query;
    
    const skip = (pagina - 1) * limite;
    let filtro = { usuarioId };
    
    // Filtros opcionales
    if (estadoSalud) filtro['estadoActual.salud'] = estadoSalud;
    if (especie) {
      const especies = await Especie.find({ 
        $or: [
          { nombreComun: new RegExp(especie, 'i') },
          { nombreCientifico: new RegExp(especie, 'i') }
        ]
      });
      filtro.especieId = { $in: especies.map(e => e._id) };
    }
    
    const plantas = await Planta.find(filtro)
      .populate('especieId', 'nombreComun nombreCientifico familia')
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(parseInt(limite));
    
    const total = await Planta.countDocuments(filtro);
    
    res.json({ plantas });
  });

  // 🔍 GET - Obtener planta específica con detalles completos
  obtenerPlantaDetallada = asyncHandler(async (req, res, next) => {
    const { plantaId } = req.params;
    
    const planta = await Planta.findById(plantaId)
      .populate('especieId')
      .populate('usuarioId', 'nombre email');
    
    if (!planta) {
      throw new AppError('Planta no encontrada', 404);
    }

    // Calcular edad en meses
    const edadMeses = Math.floor((Date.now() - planta.fechaSiembra) / (1000 * 60 * 60 * 24 * 30));
    
    // Obtener cuidados según edad
    const cuidados = planta.especieId.cuidadosPorEdad.find(c => 
      edadMeses >= c.rangoEdadMeses.min && edadMeses <= c.rangoEdadMeses.max
    );

    // Obtener tareas pendientes para esta planta
    const tareasPendientes = await Tarea.find({
      plantaId,
      estado: 'Pendiente'
    }).sort({ fechaProgramada: 1 });

    res.json({
      success: true,
      data: {
        ...planta.toObject(),
        edadMeses,
        cuidadosRecomendados: cuidados,
        tareasPendientes: tareasPendientes.length
      }
    });
  });

  // 📊 OBTENER ESTADÍSTICAS - MÉTODO FALTANTE
  obtenerEstadisticas = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    
    const plantas = await Planta.find({ usuarioId })
      .populate('especieId', 'nombreComun familia');
    
    const totalPlantas = plantas.length;
    
    // Distribución por salud
    const porSalud = plantas.reduce((acc, planta) => {
      acc[planta.estadoActual.salud] = (acc[planta.estadoActual.salud] || 0) + 1;
      return acc;
    }, {});
    
    // Distribución por especie
    const porEspecie = plantas.reduce((acc, planta) => {
      const especie = planta.especieId.nombreComun;
      acc[especie] = (acc[especie] || 0) + 1;
      return acc;
    }, {});

    // Tareas pendientes
    const tareasPendientes = await Tarea.countDocuments({ 
      usuarioId, 
      estado: 'Pendiente' 
    });

    // Plantas que necesitan atención
    const plantasNecesitanAtencion = plantas.filter(
      planta => ['Malo', 'Regular'].includes(planta.estadoActual.salud)
    ).length;

    // Edad promedio
    const edadPromedioMeses = plantas.length > 0 
      ? Math.round(plantas.reduce((sum, planta) => {
          const edad = Math.floor((Date.now() - planta.fechaSiembra) / (1000 * 60 * 60 * 24 * 30));
          return sum + edad;
        }, 0) / plantas.length)
      : 0;

    res.json({
      success: true,
      data: {
        totalPlantas,
        plantasNecesitanAtencion,
        tareasPendientes,
        edadPromedioMeses,
        distribucionSalud: porSalud,
        distribucionEspecies: porEspecie,
        plantasRecientes: plantas
          .sort((a, b) => new Date(b.fechaSiembra) - new Date(a.fechaSiembra))
          .slice(0, 5)
          .map(p => ({
            nombre: p.nombrePersonalizado,
            especie: p.especieId.nombreComun,
            salud: p.estadoActual.salud,
            fechaSiembra: p.fechaSiembra
          }))
      }
    });
  });

  // 📝 POST - Crear nueva planta
  crearPlanta = asyncHandler(async (req, res, next) => {
    const { usuarioId, especieId, nombrePersonalizado, fechaSiembra, ubicacionSiembra } = req.body;
    
    const especie = await Especie.findById(especieId);
    if (!especie) {
      throw new AppError('Especie no encontrada', 404);
    }

    const nuevaPlanta = new Planta({
      usuarioId,
      especieId,
      nombrePersonalizado,
      fechaSiembra: new Date(fechaSiembra),
      ubicacionSiembra,
      estadoActual: {
        salud: 'Bueno',
        altura: 0,
        diametroTallo: 0,
        observaciones: 'Planta recién sembrada'
      }
    });

    await nuevaPlanta.save();

    // Configurar alertas iniciales
    await AlertaService.configurarAlertasIniciales(nuevaPlanta);

    // Populate para respuesta
    await nuevaPlanta.populate('especieId', 'nombreComun nombreCientifico');

    res.status(201).json({
      success: true,
      message: 'Planta creada exitosamente',
      data: nuevaPlanta
    });
  });
  // que datos me devuelve al crear una planta?
  /*
    {
      success: true,
      message: 'Planta creada exitosamente',
      data: {
        _id: '648a1f4e2f8b9c0012345678',
        usuarioId: '648a1e9c2f8b9c0012345677',
        especieId: {
          _id: '648a1d5b2f8b9c0012345676',
          nombreComun: 'Guácimo blanco',
          nombreCientifico: 'Inga vera'
        },
        nombrePersonalizado: 'mi macuilin hermoso',
        fechaSiembra: '2024-01-15T00:00:00.000Z',
        ubicacionSiembra: {
          tipo: 'Jardin',
          descripcion: 'Jardín de mi casa',
          coordenadas: { type: 'Point', coordinates: [ -96.3514, 18.4589 ] },
        }
      }
    }
  */
  
  // 📝 POST - Registrar crecimiento
  registrarCrecimiento = asyncHandler(async (req, res, next) => {
    const { plantaId } = req.params;
    const { altura, diametroTallo, numeroHojas, observaciones, fotos } = req.body;
    
    const planta = await Planta.findById(plantaId);
    
    if (!planta) {
      throw new AppError('Planta no encontrada', 404);
    }

    const nuevoRegistro = {
      fecha: new Date(),
      altura,
      diametroTallo,
      numeroHojas,
      observaciones,
      fotos: fotos || []
    };

    planta.registroCrecimiento.push(nuevoRegistro);
    planta.estadoActual.altura = altura;
    planta.estadoActual.diametroTallo = diametroTallo;
    planta.fechaActualizacion = new Date();

    await planta.save();

    // Notificar actualización via WebSocket
    WebSocketService.enviarNotificacion(planta.usuarioId, {
      tipo: 'crecimiento_registrado',
      mensaje: `Se registró crecimiento para ${planta.nombrePersonalizado}`,
      plantaId: planta._id,
      datos: nuevoRegistro
    });

    res.status(201).json({
      success: true,
      message: 'Crecimiento registrado exitosamente',
      data: nuevoRegistro
    });
  });

  // ✏️ PUT - Actualizar planta
  actualizarPlanta = asyncHandler(async (req, res, next) => {
    const { plantaId } = req.params;
    const updateData = req.body;
    
    const planta = await Planta.findByIdAndUpdate(
      plantaId,
      { 
        ...updateData,
        fechaActualizacion: new Date()
      },
      { new: true, runValidators: true }
    ).populate('especieId', 'nombreComun nombreCientifico');

    if (!planta) {
      throw new AppError('Planta no encontrada', 404);
    }

    res.json({
      success: true,
      message: 'Planta actualizada exitosamente',
      data: planta
    });
  });

  // 🗑️ DELETE - Eliminar planta
  eliminarPlanta = asyncHandler(async (req, res, next) => {
    const { plantaId } = req.params;
    
    const planta = await Planta.findById(plantaId);
    
    if (!planta) {
      throw new AppError('Planta no encontrada', 404);
    }

    // Eliminar tareas asociadas
    await Tarea.deleteMany({ plantaId });

    // Eliminar planta
    await Planta.findByIdAndDelete(plantaId);

    res.json({
      success: true,
      message: 'Planta eliminada exitosamente',
      data: { id: plantaId, nombre: planta.nombrePersonalizado }
    });
  });
}

export default new PlantaController();