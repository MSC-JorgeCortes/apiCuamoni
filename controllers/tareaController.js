import Tarea from '../models/Tarea.js';
import Planta from '../models/Planta.js';
import WebSocketService from '../services/websocketService.js';
import AlertaService from '../services/alertaService.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

class TareaController {
  
  // 🔍 Obtener tareas de usuario dependiendo de la fecha del ultima tarea
  obtenerTareasDeUsuario = asyncHandler(async (req, res, next) => {
    const { usuarioId, estado, tipo, pagina = 1, limite = 50 } = req.body;
    
    /*  el id del usuario es  68f4b63957bf712d1b0ba66c
      Ejemplo de solicitud:
      POST /api/tareas/usuario
      Cuerpo:
       
      {
        "usuarioId": "68f4b63957bf712d1b0ba66c",
        "estado": "Pendiente", // Opcional: Filtrar por estado de la tarea
        "tipo": "Riego",      // Opcional: Filtrar por tipo de tarea
        "pagina": 1,         // Número de página para paginación (opcional, por defecto 1)
        "limite": 20         // Número de tareas por página (opcional, por defecto 50)
      }
      



      Respuesta:
        {
          "success": true,  
          "data": [Array de objetos de tareas],
          "total": Número total de tareas que coinciden con el filtro,
          "paginacion": {
            "pagina": Número de página actual,
            "limite": Número de tareas por página,
            "total": Número total de tareas,
            "paginas": Número total de páginas
          }
        }
    */

      
    const filtros = { usuarioId };// Siempre filtrar por usuarioId

    if (estado) {
      filtros.estado = estado;
    }
    if (tipo) {
      filtros.tipoTarea = tipo;
    }
    const opcionesPaginacion = {
      pagina: parseInt(pagina, 10),
      limite: parseInt(limite, 10)
    };
    // Realizar la consulta con paginación, utilizando el método estático del modelo Tarea
    const resultado = await Tarea.obtenerTareasConPaginacion(filtros, opcionesPaginacion.pagina, opcionesPaginacion.limite);

    console.log('Tareas obtenidas para el usuario:', resultado);

    res.json({
      success: true,
      data: resultado.tareas,
      total: resultado.total,
      paginacion: {
        pagina: opcionesPaginacion.pagina,
        limite: opcionesPaginacion.limite,
        total: resultado.total,
        paginas: Math.ceil(resultado.total / opcionesPaginacion.limite)
      }
    });
  });


pruebaObtenerTareasDeUsuario = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.body;
    const tareas = await Tarea.find({ usuarioId })
      .populate('plantaId', 'nombrePersonalizado especieId')
      .populate('plantaId.especieId', 'nombreComun')
      .sort({ fechaProgramada: 1, prioridad: -1 });
    res.json({
      success: true,
      data: tareas
    });
  });





  // 🔍 Obtener tareas próximas
  obtenerTareasProximas = asyncHandler(async (req, res, next) => {
    const { usuarioId } = req.params;
    const { dias = 3 } = req.query;

    const tareas = await Tarea.obtenerTareasProximas(usuarioId, parseInt(dias));

    res.json({
      success: true,
      data: tareas,
      total: tareas.length,
      periodo: `próximos ${dias} días`
    });
  });

  // 📝 Crear tarea manual
  crearTareaManual = asyncHandler(async (req, res, next) => {
    const { plantaId, tipoTarea, descripcion, fechaProgramada, instrucciones, prioridad } = req.body;
    
    const planta = await Planta.findById(plantaId);
    if (!planta) {
      throw new AppError('Planta no encontrada', 404);
    }

    const nuevaTarea = new Tarea({
      plantaId,
      usuarioId: planta.usuarioId,
      tipoTarea,
      descripcion,
      fechaProgramada: new Date(fechaProgramada),
      instrucciones,
      prioridad: prioridad || 'Media',
      materialesRequeridos: this.obtenerMaterialesPorTipo(tipoTarea)
    });

    await nuevaTarea.save();

    WebSocketService.enviarNotificacion(planta.usuarioId, {
      tipo: 'nueva_tarea',
      mensaje: `Nueva tarea programada: ${descripcion}`,
      tareaId: nuevaTarea._id,
      plantaId: plantaId
    });

    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: nuevaTarea
    });
  });

  // ✏️ Completar tarea
  completarTarea = asyncHandler(async (req, res, next) => {
    const { tareaId } = req.params;
    const { observaciones } = req.body;
    
    const tarea = await Tarea.findById(tareaId)
      .populate('plantaId')
      .populate('usuarioId');
    
    if (!tarea) {
      throw new AppError('Tarea no encontrada', 404);
    }

    tarea.estado = 'Completada';
    tarea.fechaEjecucion = new Date();
    tarea.observaciones = observaciones || tarea.observaciones;

    await tarea.save();

    // Registrar en historial de cuidados
    await Planta.findByIdAndUpdate(tarea.plantaId._id, {
      $push: {
        historialCuidados: {
          fecha: new Date(),
          tipoCuidado: tarea.tipoTarea,
          descripcion: tarea.descripcion,
          observaciones: observaciones || 'Tarea completada',
          usuarioResponsable: tarea.usuarioId._id
        }
      }
    });

    // Recalcular alertas
    await AlertaService.recalcularAlertas(tarea.plantaId._id, tarea.tipoTarea);

    WebSocketService.enviarNotificacion(tarea.usuarioId._id, {
      tipo: 'tarea_completada',
      mensaje: `Tarea completada: ${tarea.descripcion}`,
      tareaId: tarea._id,
      plantaId: tarea.plantaId._id
    });

    res.json({
      success: true,
      message: 'Tarea marcada como completada',
      data: tarea
    });
  });

  obtenerMaterialesPorTipo(tipoTarea) {
    const materiales = {
      'Riego': ['Regadera', 'Agua'],
      'Fertilización': ['Fertilizante', 'Guantes', 'Pala pequeña'],
      'Poda': ['Tijeras de podar', 'Guantes', 'Bolsa para residuos'],
      'Control Plagas': ['Insecticida orgánico', 'Guantes', 'Pulverizador'],
      'Trasplante': ['Maceta nueva', 'Sustrato', 'Guantes', 'Pala'],
      'Monitoreo': ['Lupa', 'Cinta métrica', 'Cuaderno de notas']
    };
    
    return materiales[tipoTarea] || ['Guantes'];
  }
}

export default new TareaController();

