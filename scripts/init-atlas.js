// scripts/init-atlas.js
import { connectDB } from '../config/database.js';

async function inicializarAtlas() {
  try {
    console.log('🚀 Inicializando MongoDB Atlas...\n');
    
    // Conectar a la base de datos
    await connectDB();
    
    // // Ejecutar scripts en orden
    console.log('📋 1. Creando colecciones...');
    await import('./01-create-collections.js');
    
    console.log('\n📊 2. Creando índices...');
    await import('./02-create-indexes.js');
    
    console.log('\n🌿 3. Insertando especies...');
    await import('./03-insert-especies.js');
    
    console.log('\n👤 4. Creando usuario admin...');
    await import('./04-insert-admin.js');
    
    console.log('\n🪴 5. Insertando plantas de ejemplo...');
    await import('./05-insert-plantas-ejemplo.js');
    
    console.log('\n📝 6. Insertando tareas de ejemplo...');
    await import('./06-insert-tareas-ejemplo.js');
    
    console.log('\n🎉 MongoDB Atlas inicializado exitosamente!');
    console.log('📍 Puedes verificar en: https://cloud.mongodb.com');
    
  } catch (error) {
    console.error('❌ Error en inicialización:', error);
    process.exit(1);
  }
}

inicializarAtlas();