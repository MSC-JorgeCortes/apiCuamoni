// server.js
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

// Importar conexión de base de datos
import { connectDB, getDBStatus } from './config/database.js';

// Importar rutas
import usuarioRoutes from './routes/usuarioRoutes.js';
import especieRoutes from './routes/especieRoutes.js';
import plantaRoutes from './routes/plantaRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

// Importar servicios
import WebSocketService from './services/websocketService.js';
import AlertaService from './services/alertaService.js';

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static('public/uploads'));

// Ruta de salud MEJORADA con estado de BD
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  
  res.json({ 
    status: 'OK', 
    message: 'API de Plantas funcionando',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.isConnected,
      readyState: dbStatus.readyState,
      dbName: dbStatus.dbName,
      host: dbStatus.host,
      connectionAttempts: dbStatus.connectionAttempts
    },
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime()
  });
});

// Ruta de estado de base de datos
app.get('/api/database/status', (req, res) => {
  const dbStatus = getDBStatus();
  
  res.json({
    success: true,
    data: dbStatus
  });
});

// Conectar a la base de datos ANTES de inicializar otras cosas
console.log('🚀 Iniciando aplicación Plantas Papaloapan...');
console.log('📋 Verificando configuración...');

// Validar variables de entorno críticas
const requiredEnvVars = ['MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingEnvVars);
  console.error('💡 Asegúrate de tener un archivo .env con las variables requeridas');
  process.exit(1);
}

// Inicializar base de datos
connectDB().then((models) => {
  console.log('✅ Modelos de base de datos cargados');
  
  // Solo inicializar el resto si la BD está conectada
  initializeApp();
}).catch((error) => {
  console.error('💥 Error crítico inicializando base de datos:', error);
  process.exit(1);
});

function initializeApp() {
  // Inicializar WebSocket
  const wss = new WebSocketServer({ server });
  WebSocketService.inicializar(wss);

  // Rutas API (solo si BD está conectada)
  app.use('/apis/usuarioss', usuarioRoutes);
  app.use('/api/especies', especieRoutes);
  app.use('/api/plantas', plantaRoutes);
  app.use('/api/tareas', tareaRoutes);

  // Ruta de documentación
  app.get('/api', (req, res) => {
    res.json({
      message: '🌿 API de Plantas Papaloapan',
      version: '1.0.0',
      endpoints: {
        usuarios: '/api/usuarios',
        especies: '/api/especies',
        plantas: '/api/plantas',
        tareas: '/api/tareas',
        health: '/api/health',
        database: '/api/database/status'
      }
    });
  });

  // Middleware para rutas no encontradas
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Ruta ${req.originalUrl} no encontrada`,
      availableEndpoints: [
        '/api/usuarios',
        '/api/especies', 
        '/api/plantas',
        '/api/tareas',
        '/api/health',
        '/api/database/status'
      ]
    });
  });

  // Manejo global de errores
  app.use((error, req, res, next) => {
    console.error('💥 Error global:', error);
    
    // Errores de base de datos
    if (error.name === 'MongoError' || error.name === 'MongooseError') {
      return res.status(503).json({
        success: false,
        message: 'Error de base de datos',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Service temporarily unavailable'
      });
    }
    
    // Errores de validación
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    // Error genérico
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      ...(process.env.NODE_ENV === 'development' && { 
        error: error.message,
        stack: error.stack 
      })
    });
  });

  // Iniciar servicio de alertas (solo en producción)
  if (process.env.NODE_ENV === 'production') {
    AlertaService.iniciarMonitoreo();
  }

  const PORT = process.env.PORT || 3000;
  
  server.listen(PORT, () => {
    console.log(`🎉 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📡 WebSocket disponible en ws://localhost:${PORT}`);
    console.log(`🌐 API disponible en http://localhost:${PORT}/api`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`💾 Base de datos: ${process.env.MONGODB_URI.split('/').pop() || 'N/A'}`);
  });

  // Manejo graceful de shutdown
  process.on('SIGINT', () => {
    console.log('\n🔻 Recibido SIGINT. Cerrando servidor gracefulmente...');
    server.close(() => {
      console.log('✅ Servidor HTTP cerrado');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    console.log('🔻 Recibido SIGTERM. Cerrando servidor gracefulmente...');
    server.close(() => {
      console.log('✅ Servidor HTTP cerrado');
      process.exit(0);
    });
  });
}

export default app;