// scripts/02-create-indexes.js
import mongoose from 'mongoose';

async function createIndexes() {
  console.log('📊 Creando índices para optimización...');
  
  try {
    // Índices para Usuarios
    console.log('   👤 Índices de usuarios...');
    await mongoose.connection.collection('usuarios').createIndex({ "ubicacion.coordenadas": "2dsphere" });
    await mongoose.connection.collection('usuarios').createIndex({ "redesSociales.facebook.id": 1 });
    await mongoose.connection.collection('usuarios').createIndex({ "redesSociales.instagram.id": 1 });
    await mongoose.connection.collection('usuarios').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.collection('usuarios').createIndex({ "plantas": 1 });

    // Índices para Especies
    console.log('   🌿 Índices de especies...');
    await mongoose.connection.collection('especies').createIndex({ 
      nombreComun: "text", 
      nombreCientifico: "text", 
      familia: "text" 
    });
    await mongoose.connection.collection('especies').createIndex({ familia: 1 });
    await mongoose.connection.collection('especies').createIndex({ origen: 1 });
    await mongoose.connection.collection('especies').createIndex({ estadoConservacion: 1 });
    await mongoose.connection.collection('especies').createIndex({ nombreCientifico: 1 }, { unique: true });

    // Índices para Plantas
    console.log('   🪴 Índices de plantas...');
    await mongoose.connection.collection('plantas').createIndex({ usuarioId: 1 });
    await mongoose.connection.collection('plantas').createIndex({ especieId: 1 });
    await mongoose.connection.collection('plantas').createIndex({ "ubicacionSiembra.coordenadas": "2dsphere" });
    await mongoose.connection.collection('plantas').createIndex({ "estadoActual.salud": 1 });
    await mongoose.connection.collection('plantas').createIndex({ fechaSiembra: -1 });

    // Índices para Tareas
    console.log('   📝 Índices de tareas...');
    await mongoose.connection.collection('tareas').createIndex({ usuarioId: 1, estado: 1 });
    await mongoose.connection.collection('tareas').createIndex({ fechaProgramada: 1 });
    await mongoose.connection.collection('tareas').createIndex({ plantaId: 1 });
    await mongoose.connection.collection('tareas').createIndex({ prioridad: -1 });
    await mongoose.connection.collection('tareas').createIndex({ tipoTarea: 1 });

    console.log('✅ Todos los índices creados exitosamente');
    
  } catch (error) {
    console.error('❌ Error creando índices:', error.message);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  import('../config/database.js').then(() => createIndexes());
} else {
  await createIndexes();
}