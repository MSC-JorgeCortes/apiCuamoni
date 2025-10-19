import WebSocket from 'ws';
import Tarea from '../models/Tarea.js';

class WebSocketService {
  constructor() {
    this.wss = null;
    this.conexiones = new Map();
  }

  inicializar(wss) {
    this.wss = wss;
    
    wss.on('connection', (ws, req) => {
      console.log('🔌 Nueva conexión WebSocket');

      ws.on('message', (data) => {
        try {
          const mensaje = JSON.parse(data);
          this.procesarMensaje(ws, mensaje);
        } catch (error) {
          console.error('Error procesando mensaje WebSocket:', error);
        }
      });

      ws.on('close', () => {
        this.eliminarConexion(ws);
      });

      ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
        this.eliminarConexion(ws);
      });
    });
  }

  procesarMensaje(ws, mensaje) {
    switch (mensaje.tipo) {
      case 'autenticacion':
        this.registrarConexion(mensaje.usuarioId, ws);
        this.enviarAlertasPendientes(mensaje.usuarioId);
        break;
        
      case 'ping':
        ws.send(JSON.stringify({ tipo: 'pong', timestamp: new Date().toISOString() }));
        break;
        
      default:
        console.log('Mensaje WebSocket no reconocido:', mensaje.tipo);
    }
  }

  registrarConexion(usuarioId, ws) {
    this.conexiones.set(usuarioId, ws);
    console.log(`✅ Usuario ${usuarioId} autenticado en WebSocket`);
  }

  eliminarConexion(ws) {
    for (let [usuarioId, conexion] of this.conexiones.entries()) {
      if (conexion === ws) {
        this.conexiones.delete(usuarioId);
        console.log(`❌ Usuario ${usuarioId} desconectado`);
        break;
      }
    }
  }

  enviarNotificacion(usuarioId, mensaje) {
    const conexion = this.conexiones.get(usuarioId);
    if (conexion && conexion.readyState === WebSocket.OPEN) {
      conexion.send(JSON.stringify({
        ...mensaje,
        timestamp: new Date().toISOString()
      }));
      console.log(`📨 Notificación enviada a usuario ${usuarioId}:`, mensaje.tipo);
    }
  }

  async enviarAlertasPendientes(usuarioId) {
    try {
      const tareasPendientes = await Tarea.find({
        usuarioId,
        estado: 'Pendiente',
        fechaProgramada: { $lte: new Date() }
      })
      .populate('plantaId', 'nombrePersonalizado')
      .limit(10);

      if (tareasPendientes.length > 0) {
        this.enviarNotificacion(usuarioId, {
          tipo: 'alertas_iniciales',
          mensaje: `Tienes ${tareasPendientes.length} tareas pendientes`,
          tareas: tareasPendientes.map(t => ({
            id: t._id,
            descripcion: t.descripcion,
            tipo: t.tipoTarea,
            planta: t.plantaId.nombrePersonalizado
          }))
        });
      }
    } catch (error) {
      console.error('Error enviando alertas pendientes:', error);
    }
  }
}

export default new WebSocketService();