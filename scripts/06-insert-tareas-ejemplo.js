// scripts/06-insert-tareas-ejemplo.js
import { Tarea, Planta, Usuario } from '../config/database.js';

async function insertTareasEjemplo() {
  console.log('📝 Creando tareas de ejemplo...');

   try{
    const admin = await Usuario.findOne({ email: "admin@plantaspapaloapan.com" });
    const plantas = await Planta.find({ usuarioId: admin._id });

    
    if (plantas.length === 0) {
      console.log('   ⚠️  No hay plantas para asignar tareas');
      return;
    }

    let tareasCreadas = 0;

    for (const planta of plantas) {
      const tareas = [
        {
          plantaId: planta._id,
          usuarioId: admin._id,
          tipoTarea: "Riego",
          descripcion: `Riego programado para ${planta.nombrePersonalizado}`,
          fechaProgramada: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 días
          instrucciones: "Regar abundantemente alrededor de la base, evitar mojar las hojas durante el día",
          materialesRequeridos: ["Regadera", "Agua"],
          prioridad: "Media",
          estado: "Pendiente"
        },
        {
          plantaId: planta._id,
          usuarioId: admin._id,
          tipoTarea: "Fertilización",
          descripcion: `Fertilización trimestral para ${planta.nombrePersonalizado}`,
          fechaProgramada: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días
          instrucciones: "Aplicar fertilizante orgánico mezclado con tierra alrededor del tallo principal",
          materialesRequeridos: ["Fertilizante orgánico", "Guantes", "Pala pequeña"],
          prioridad: "Baja",
          estado: "Pendiente"
        },
        {
          plantaId: planta._id,
          usuarioId: admin._id,
          tipoTarea: "Monitoreo",
          descripcion: `Monitoreo de salud para ${planta.nombrePersonalizado}`,
          fechaProgramada: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
          instrucciones: "Revisar hojas, tallo y raíces en busca de plagas o enfermedades",
          materialesRequeridos: ["Lupa", "Cuaderno de notas", "Cinta métrica"],
          prioridad: "Media",
          estado: "Pendiente"
        }
      ];

      for (const tareaData of tareas) {
        const tareaExistente = await Tarea.findOne({
          plantaId: tareaData.plantaId,
          tipoTarea: tareaData.tipoTarea,
          estado: "Pendiente"
        });

        if (!tareaExistente) {
          const tarea = new Tarea(tareaData);
          await tarea.save();
          tareasCreadas++;
        }
      }
    }

    console.log(`   ✅ ${tareasCreadas} tareas creadas`);
    console.log(`   📊 Total tareas en BD: ${await Tarea.countDocuments()}`);
    
  } catch (error) {
    console.error('   ❌ Error creando tareas de ejemplo:', error.message);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  import('../config/database.js').then(() => insertTareasEjemplo());
} else {
  await insertTareasEjemplo();
}