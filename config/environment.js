import 'dotenv/config';

const config = {
  // 🌐 Servidor
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
    
  },
  
  // 🗃️ Base de datos
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jardin_papaloapan',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // 🔐 Autenticación
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'secret_key_plantas_papaloapan_fallback'
    }
  },
  
  // 📧 Email
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'Plantas Papaloapan <noreply@plantaspapaloapan.com>'
  },
  
  // 🖼️ Uploads
  upload: {
    maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadDir: 'public/uploads'
  },

  // 🔗 REDES SOCIALES - Configuración completa
  socialMedia: {
    
    // 📘 FACEBOOK
    facebook: {
      enabled: !!process.env.FACEBOOK_APP_ID,
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      apiVersion: 'v18.0',
      scope: ['email', 'public_profile', 'pages_manage_posts', 'pages_read_engagement'],
      required: true // Para publicación automática
    },
    
    // 📸 INSTAGRAM
    instagram: {
      enabled: !!process.env.INSTAGRAM_APP_ID,
      appId: process.env.INSTAGRAM_APP_ID,
      appSecret: process.env.INSTAGRAM_APP_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL,
      apiVersion: 'v18.0',
      scope: ['instagram_basic', 'instagram_content_publish', 'pages_show_list'],
      required: true // Para publicación automática
    },
    
    // 🎵 TIKTOK
    tiktok: {
      enabled: !!process.env.TIKTOK_CLIENT_KEY,
      clientKey: process.env.TIKTOK_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET,
      callbackURL: process.env.TIKTOK_CALLBACK_URL,
      scope: ['user.info.basic', 'video.publish'],
      required: false // Opcional - API más restrictiva
    },
    
    // 🐦 TWITTER (X)
    twitter: {
      enabled: !!process.env.TWITTER_CONSUMER_KEY,
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      scope: ['tweet.read', 'tweet.write', 'users.read'],
      required: false // Opcional - Límites de API
    },
    
    // 💼 LINKEDIN (Opcional)
    linkedin: {
      enabled: !!process.env.LINKEDIN_CLIENT_ID,
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social'],
      required: false
    },
    
    // 📌 PINTEREST (Opcional)
    pinterest: {
      enabled: !!process.env.PINTEREST_APP_ID,
      appId: process.env.PINTEREST_APP_ID,
      appSecret: process.env.PINTEREST_APP_SECRET,
      callbackURL: process.env.PINTEREST_CALLBACK_URL,
      scope: ['boards:read', 'boards:write', 'pins:read', 'pins:write'],
      required: false
    }
  },

  // ⚙️ Configuración de publicación automática
  autoPublish: {
    defaultFrequency: 'semanal',
    maxPostsPerDay: 3,
    allowedHours: {
      start: 8,  // 8 AM
      end: 21    // 9 PM
    },
    content: {
      maxLength: {
        facebook: 5000,
        instagram: 2200,
        twitter: 280,
        tiktok: 150,
        linkedin: 3000,
        pinterest: 500
      }
    }
  }
};

// Validar configuraciones requeridas
export const validateConfig = () => {
  const errors = [];

  // Validar JWT Secret
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    errors.push('JWT_SECRET debe tener al menos 32 caracteres para producción');
  }

  // Validar MongoDB
  if (!process.env.MONGODB_URI) {
    errors.push('MONGODB_URI es requerida');
  }

  // Validar redes sociales si están habilitadas
  const requiredSocialMedia = ['facebook', 'instagram'];
  requiredSocialMedia.forEach(platform => {
    const config = config.socialMedia[platform];
    if (config.enabled && (!config.appId || !config.appSecret)) {
      errors.push(`Configuración incompleta para ${platform}: se necesitan APP_ID y APP_SECRET`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ Errores de configuración:');
    errors.forEach(error => console.error(`   - ${error}`));
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Configuración inválida para producción');
    } else {
      console.warn('⚠️  Continuando con configuración de desarrollo...');
    }
  }

  return errors.length === 0;
};

export default config;