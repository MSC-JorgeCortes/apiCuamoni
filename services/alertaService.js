import Tarea from '../models/Tarea.js';
import Planta from '../models/Planta.js';
import Especie from '../models/Especie.js';
import WebSocketService from './websocketService.js';

class AlertaService {
  constructor() {
    this.intervaloMonitoreo = null;
  }

  iniciarMonitoreo() {
    // Revisar alertas cada 30 minutos
    this.intervaloMonitoreo = setInterval(() => {
      this.revisarYGenerarAlertas();
    }, 30 * 60 * 1000);

    console.log('✅ Servicio de alertas iniciado');
  }

  async revisarYGenerarAlertas() {
    try {
      console.log('🔍 Revisando alertas automáticas...');
      
      const hoy = new Date();
      const tresDias = new Date(hoy.getTime() + (3 * 24 * 60 * 60 * 1000));

      const plantasConAlertas = await Planta.aggregate([
        {
          $match: {
            $or: [
              { "alertasConfiguradas.proximoRiego": { $lte: tresDias } },
              { "alertasConfiguradas.proximaFertilizacion": { $lte: tresDias } }
            ]
          }
        },
        {
          $lookup: {
            from: 'especies',
            localField: 'especieId',
            foreignField: '_id',
            as: 'especie'
          }
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: 'usuarioId',
            foreignField: '_id',
            as: 'usuario'
          }
        }
      ]);

      for (const planta of plantasConAlertas) {
        await this.generarTareasDesdeAlertas(planta);
      }

      console.log(`✅ Revisión completada. ${plantasConAlertas.length} plantas con alertas.`);
    } catch (error) {
      console.error('❌ Error en revisión de alertas:', error);
    }
  }

  async generarTareasDesdeAlertas(planta) {
    const alertas = planta.alertasConfiguradas;
    const especie = planta.especie[0];
    const usuario = planta.usuario[0];
    
    const edadMeses = Math.floor((Date.now() - planta.fechaSiembra) / (1000 * 60 * 60 * 24 * 30));
    const cuidados = especie.cuidadosPorEdad.find(c => 
      edadMeses >= c.rangoEdadMeses.min && edadMeses <= c.rangoEdadMeses.max
    );

    const tareasAGenerar = [];

    if (alertas.proximoRiego && alertas.proximoRiego <= new Date()) {
      tareasAGenerar.push({
        tipo: 'Riego',
        fecha: alertas.proximoRiego,
        instrucciones: cuidados?.riego?.observaciones || 'Regar según necesidades de la planta',
        prioridad: alertas.proximoRiego < new Date() ? 'Alta' : 'Media'
      });
    }

    for (const tareaInfo of tareasAGenerar) {
      await this.crearTareaAutomatica(planta, usuario, tareaInfo);
    }
  }

  async crearTareaAutomatica(planta, usuario, tareaInfo) {
    const tareaExistente = await Tarea.findOne({
      plantaId: planta._id,
      tipoTarea: tareaInfo.tipo,
      estado: 'Pendiente'
    });

    if (!tareaExistente) {
      const nuevaTarea = new Tarea({
        plantaId: planta._id,
        usuarioId: usuario._id,
        tipoTarea: tareaInfo.tipo,
        descripcion: `${tareaInfo.tipo} para ${planta.nombrePersonalizado}`,
        fechaProgramada: tareaInfo.fecha,
        estado: 'Pendiente',
        instrucciones: tareaInfo.instrucciones,
        prioridad: tareaInfo.prioridad
      });

      await nuevaTarea.save();

      WebSocketService.enviarNotificacion(usuario._id, {
        tipo: 'alerta_automatica',
        mensaje: `¡${planta.nombrePersonalizado} necesita ${tareaInfo.tipo.toLowerCase()}!`,
        tareaId: nuevaTarea._id,
        plantaId: planta._id,
        prioridad: tareaInfo.prioridad
      });
    }
  }

  async configurarAlertasIniciales(planta) {
    const especie = await Especie.findById(planta.especieId);
    const cuidados = especie.cuidadosPorEdad[0]; // Primer rango de edad

    if (cuidados && cuidados.riego) {
      const proximoRiego = new Date();
      // Configurar próximo riego basado en la frecuencia
      planta.alertasConfiguradas.proximoRiego = proximoRiego;
      await planta.save();
    }
  }

  async recalcularAlertas(plantaId, tipoTarea) {
    const planta = await Planta.findById(plantaId).populate('especieId');
    const edadMeses = Math.floor((Date.now() - planta.fechaSiembra) / (1000 * 60 * 60 * 24 * 30));
    const cuidados = planta.especieId.cuidadosPorEdad.find(c => 
      edadMeses >= c.rangoEdadMeses.min && edadMeses <= c.rangoEdadMeses.max
    );

    if (tipoTarea === 'Riego' && cuidados?.riego) {
      const proximoRiego = new Date();
      // Calcular próxima fecha basada en frecuencia
      planta.alertasConfiguradas.proximoRiego = proximoRiego;
      await planta.save();
    }
  }
}

export default new AlertaService();