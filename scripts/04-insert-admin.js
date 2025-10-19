// scripts/04-insert-admin.js
import { Usuario } from '../config/database.js';
import bcrypt from 'bcryptjs';

async function insertAdmin() {
  console.log('👤 Creando usuario administrador...');

  const adminData = {
    nombre: "Administrador Plantas Papaloapan",
    email: "admin@plantaspapaloapan.com",
    password: await bcrypt.hash("Admin123!", 12),
    telefono: "+52 1234567800",
    biografia: "Administrador principal del sistema de plantas endémicas de la cuenca del Papaloapan.",
    ubicacion: {
      municipio: "Cosamaloapan",
      localidad: "Centro",
      estado: "Veracruz",
      coordenadas: {  
        "type": "Point",
        "coordinates": [-96.3512, 18.4586]  
      },
      zona: "Cuenca del Papaloapan"
    },
    redesSociales: {
      facebook: { configurado: false },
      instagram: { configurado: false },
      tiktok: { configurado: false },
      twitter: { configurado: false }
    },
    configuracionPublicacion: {
      publicarAutomaticamente: false,
      redesHabilitadas: {
        facebook: false,
        instagram: false,
        tiktok: false,
        twitter: false
      },
      tiposEventos: {
        nuevoCrecimiento: true,
        cosecha: true,
        floracion: true,
        cuidadoEspecial: true,
        logro: true
      },
      frecuenciaMaxima: "semanal",
      formatoMensaje: "formal",
      incluirHashtags: true,
      incluirUbicacion: true
    },
    rol: "administrador",
    verificado: true,
    estado: "activo"
  };

  try {
    const adminExistente = await Usuario.findOne({ 
      email: adminData.email 
    });
    
    if (!adminExistente) {
      const admin = new Usuario(adminData);
      await admin.save();
      console.log('   ✅ Administrador creado exitosamente');
      console.log('   📧 Email: admin@plantaspapaloapan.com');
      console.log('   🔐 Password: Admin123!');
      console.log('   ⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    } else {
      console.log('   ⏩ Administrador ya existe');
    }
    
    console.log(`   📊 Total usuarios en BD: ${await Usuario.countDocuments()}`);
    
  } catch (error) {
    console.error('   ❌ Error creando administrador:', error.message);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  import('../config/database.js').then(() => insertAdmin());
} else {
  await insertAdmin();
}