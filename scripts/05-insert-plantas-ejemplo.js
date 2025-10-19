// scripts/05-insert-plantas-ejemplo.js
import { Planta, Usuario, Especie } from '../config/database.js';

async function insertPlantasEjemplo() {
  console.log('🪴 Creando plantas de ejemplo...');

  try {
    // Obtener admin y algunas especies
    const admin = await Usuario.findOne({ email: "admin@plantaspapaloapan.com" });
    const macuil = await Especie.findOne({ nombreComun: "Macuil" });
    const amate = await Especie.findOne({ nombreComun: "Amate" });
    const ceiba = await Especie.findOne({ nombreComun: "Caoba" });

    if (!admin || !macuil) {
      console.log('   ⚠️  No se pueden crear plantas - admin o especies no encontrados');
      return;
    }

    const plantasEjemplo = [
      {
        usuarioId: admin._id,
        especieId: macuil._id,
        nombrePersonalizado: "Macuil del Administrador",
        fechaSiembra: new Date("2024-01-15"),
        ubicacionSiembra: {
          tipo: "Jardin",
          descripcion: "Jardín principal de la estación",
          coordenadas: { 
            type: "Point", 
            coordinates: [-96.3514, 18.4589]  // [lng, lat]
           },
          direccion: "Estación de Investigación Papaloapan"
        },
        estadoActual: {
          salud: "Excelente",
          altura: 120,
          diametroTallo: 6.5,
          observaciones: "Ejemplar de referencia para la especie"
        }
      },
      {
        usuarioId: admin._id,
        especieId: amate._id,
        nombrePersonalizado: "Amate Centenario",
        fechaSiembra: new Date("2023-06-10"),
        ubicacionSiembra: {
          tipo: "Campo",
          descripcion: "Área de conservación",
          coordenadas: { 
            type: "Point",
            coordinates: [-96.3600, 18.4700]  // [lng, lat]
           },
          direccion: "Área Natural Protegida Papaloapan"
        },
        estadoActual: {
          salud: "Bueno",
          altura: 450,
          diametroTallo: 25.8,
          observaciones: "Árbol maduro con raíces aéreas bien desarrolladas"
        }
      },
      {
        usuarioId: admin._id,
        especieId: ceiba._id,
        nombrePersonalizado: "Ceiba Sagrada Admin",
        fechaSiembra: new Date("2024-03-01"),
        ubicacionSiembra: {
          tipo: "Jardin",
          descripcion: "Entrada principal",
          coordenadas: { 
            type: "Point",
            coordinates: [-96.3525, 18.4595]  // [lng, lat]
           },
          direccion: "Estación de Investigación Papaloapan"
        },
        estadoActual: {
          salud: "Bueno",
          altura: 85,
          diametroTallo: 4.2,
          observaciones: "Creciendo rápidamente, espinas bien formadas"
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