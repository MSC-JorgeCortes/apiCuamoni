// scripts/01-create-collections.js
import mongoose from 'mongoose';

async function createCollections() {
  console.log('🔧 Creando colecciones...');
  
  // Las colecciones se crean automáticamente al insertar el primer documento
  // Pero podemos forzar la creación con validación de esquema
  
  const collections = [
    'usuarios',
    'especies', 
    'plantas',
    'tareas'
  ];

  for (const collectionName of collections) {
    try {
      // Verificar si existe la colección
      const collections = await mongoose.connection.db.listCollections({ 
        name: collectionName 
      }).toArray();
      
      if (collections.length === 0) {
        console.log(`   ✅ Creando colección: ${collectionName}`);
        await mongoose.connection.db.createCollection(collectionName);
      } else {
        console.log(`   ⏩ Colección ${collectionName} ya existe`);
      }
    } catch (error) {
      console.log(`   ✅ Colección ${collectionName} lista`);
    }
  }
  
  console.log('✅ Todas las colecciones verificadas/creadas');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  import('../config/database.js').then(() => createCollections());
} else {
  await createCollections();
}