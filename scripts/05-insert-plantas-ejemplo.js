// scripts/05-insert-plantas-ejemplo.js
import { Planta, Usuario, Especie } from '../config/database.js';

async function insertPlantasEjemplo() {
  console.log('🪴 Creando plantas de ejemplo...');

  try {
    // Obtener admin y algunas especies
    const admin = await Usuario.findOne({ email: "admin@plantaspapaloapan.com" });
    const macuil = await Especie.findOne({ nombreComun: "Guácimo blanco" });
    const amate = await Especie.findOne({ nombreComun: "Cabeza de negro" });
    const ceiba = await Especie.findOne({ nombreComun: "Caoba" });
  
    if (!admin || !macuil) {
      console.log('   ⚠️  No se pueden crear plantas - admin o especies no encontrados');
      return;
    }

    const plantasEjemplo = [
      {
        usuarioId: admin._id,
        especieId: macuil._id,
        nombrePersonalizado: "mi macuilin hermoso",
        fechaSiembra: new Date("2024-01-15"),
        ubicacionSiembra: {
          tipo: "Jardin",
          descripcion: "Jardín de mi casa",
          coordenadas: { 
            type: "Point", 
            coordinates: [-96.3514, 18.4589]  // [lng, lat]
           },
          direccion: "constitución No. 123, Tierra Blanca, Ver."
        },
        estadoActual: {
          salud: "Excelente",
          altura: 120,
          diametroTallo: 6.5,
          observaciones: "es mi primera planta y va muy bien"
        }
      }
    ];

    let plantasCreadas = 0;

    for (const plantaData of plantasEjemplo) {
      const plantaExistente = await Planta.findOne({
        usuarioId: plantaData.usuarioId,
        nombrePersonalizado: plantaData.nombrePersonalizado
      });

      if (!plantaExistente) {
        const planta = new Planta(plantaData);
        await planta.save();
        plantasCreadas++;
        console.log(`   ✅ ${plantaData.nombrePersonalizado}`);
      } else {
        console.log(`   ⏩ ${plantaData.nombrePersonalizado} (ya existe)`);
      }
    }

    console.log(`   📊 Total plantas en BD: ${await Planta.countDocuments()}`);
    
  } catch (error) {
    console.error('   ❌ Error creando plantas de ejemplo:', error.message);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  import('../config/database.js').then(() => insertPlantasEjemplo());
} else {
  await insertPlantasEjemplo();
}