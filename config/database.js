// config/database.js
import mongoose from 'mongoose';
import Usuario from '../models/Usuario.js';
import Especie from '../models/Especie.js';
import Planta from '../models/Planta.js';
import Tarea from '../models/Tarea.js';
import config from './environment.js';

class Database {
  constructor() {
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxConnectionAttempts = 5;
    this.reconnectInterval = 5000; // 5 segundos
    this.dbName = config.database.dbName ;
  }

  async connect() {
    try {
      console.log('🔗 Conectando a MongoDB...');
      
      // Validar URI de MongoDB
      if (!config.database.uri) {
        throw new Error('MONGODB_URI no está definida en las variables de entorno');
      }

      // Opciones de conexión mejoradas
      const options = {
        ...config.database.options,
        serverSelectionTimeoutMS: 10000, // 10 segundos
        socketTimeoutMS: 45000, // 45 segundos
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
        retryWrites: true,
        retryReads: true,
        
      };

      // Establecer conexión
      const conn = await mongoose.connect(config.database.uri, options);

      this.isConnected = true;
      this.connectionAttempts = 0;

      console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
      console.log(`📊 Base de datos: ${conn.connection.name}`);
      console.log(`👤 Usuario: ${conn.connection.user || 'N/A'}`);

      // Manejar eventos de conexión
      this.setupEventHandlers();

      return {
        Usuario,
        Especie,
        Planta,
        Tarea
      };

    } catch (error) {
      this.handleConnectionError(error);
    }
  }

  setupEventHandlers() {
    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose conectado a MongoDB');
      this.isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Error de Mongoose:', err.message);
      this.isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose desconectado de MongoDB');
      this.isConnected = false;
      this.attemptReconnection();
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🟢 Mongoose reconectado a MongoDB');
      this.isConnected = true;
      this.connectionAttempts = 0;
    });

    // Manejar cierre graceful de la aplicación
    process.on('SIGINT', this.closeConnection.bind(this));
    process.on('SIGTERM', this.closeConnection.bind(this));
  }

  handleConnectionError(error) {
    this.connectionAttempts++;
    
    console.error(`❌ Error conectando a MongoDB (Intento ${this.connectionAttempts}/${this.maxConnectionAttempts}):`);
    
    // Errores específicos con mensajes útiles
    if (error.name === 'MongoNetworkError') {
      console.error('   🔌 Error de red - Verifica que MongoDB esté ejecutándose');
      console.error('   💡 Comando: mongod (o sudo systemctl start mongod)');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('   🚫 No se puede contactar el servidor - Verifica la URI');
      console.error('   💡 URI actual:', config.database.uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    } else if (error.name === 'MongoParseError') {
      console.error('   📝 Error en la URI de MongoDB - Formato incorrecto');
      console.error('   💡 Formato esperado: mongodb://usuario:contraseña@host:puerto/base_de_datos');
    } else if (error.name === 'MongoTimeoutError') {
      console.error('   ⏰ Timeout de conexión - El servidor no responde');
    } else if (error.code === 'ENOTFOUND') {
      console.error('   🌐 Host no encontrado - Verifica el nombre del host');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   🚪 Conexión rechazada - Verifica que MongoDB esté en el puerto correcto');
      console.error('   💡 Puerto por defecto: 27017');
    } else if (error.code === 18) {
      console.error('   🔐 Error de autenticación - Verifica usuario y contraseña');
    } else if (error.code === 13) {
      console.error('   🚫 Permisos insuficientes - El usuario no tiene acceso a la base de datos');
    } else {
      console.error('   📋 Error detallado:', error.message);
    }

    // Intentar reconexión si no hemos excedido el máximo de intentos
    if (this.connectionAttempts < this.maxConnectionAttempts) {
      console.log(`   🔄 Reintentando en ${this.reconnectInterval / 1000} segundos...`);
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.error('   💥 Máximo de intentos de conexión alcanzado');
      console.error('   🛑 Cerrando aplicación...');
      process.exit(1);
    }
  }

  attemptReconnection() {
    if (this.connectionAttempts < this.maxConnectionAttempts) {
      console.log(`🔄 Intentando reconexión (${this.connectionAttempts + 1}/${this.maxConnectionAttempts})...`);
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  async closeConnection() {
    try {
      if (this.isConnected) {
        await mongoose.connection.close();
        console.log('🔌 Conexión a MongoDB cerrada');
      }
      process.exit(0);
    } catch (error) {
      console.error('❌ Error cerrando conexión a MongoDB:', error);
      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      connectionAttempts: this.connectionAttempts,
      maxConnectionAttempts: this.maxConnectionAttempts,
      readyState: mongoose.connection.readyState,
      dbName: mongoose.connection.name,
      host: mongoose.connection.host
    };
  }
}

// Crear instancia única (Singleton)
const database = new Database();

// Exportar función de conexión y modelos
export const connectDB = () => database.connect();
export const getDBStatus = () => database.getConnectionStatus();
export const closeDB = () => database.closeConnection();

export {
  Usuario,
  Especie,
  Planta,
  Tarea
};