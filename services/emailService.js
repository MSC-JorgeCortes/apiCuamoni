// services/emailService.js
import { createTransporter } from 'nodemailer';
import { email } from '../config/environment.js';
import { AppError } from '../middleware/errorHandler.js';

class EmailService {
  constructor() {
    this.transporter = createTransporter({
      service: email.service,
      auth: {
        user: email.user,
        pass: email.password
      }
    });
  }

  async sendWelcomeEmail(user) {
    const mailOptions = {
      from: email.user,
      to: user.email,
      subject: '¡Bienvenido a Plantas TreeNath! 🌿',
      html: this.getWelcomeTemplate(user)
    };

    await this.sendEmail(mailOptions);
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: email.user,
      to: user.email,
      subject: 'Restablecer tu contraseña - Plantas Papaloapan',
      html: this.getPasswordResetTemplate(user, resetURL)
    };

    await this.sendEmail(mailOptions);
  }

  async sendPlantAlertEmail(user, plant, alertType) {
    const mailOptions = {
      from: email.user,
      to: user.email,
      subject: `⚠️ Alerta para ${plant.nombrePersonalizado}`,
      html: this.getPlantAlertTemplate(user, plant, alertType)
    };

    await this.sendEmail(mailOptions);
  }

  async sendSocialMediaReport(user, report) {
    const mailOptions = {
      from: email.user,
      to: user.email,
      subject: '📊 Reporte de Publicaciones en Redes Sociales',
      html: this.getSocialMediaReportTemplate(user, report)
    };

    await this.sendEmail(mailOptions);
  }

  async sendEmail(mailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email enviado a: ${mailOptions.to}`);
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      throw new AppError('Error al enviar el email', 500);
    }
  }

  // Templates de email
  getWelcomeTemplate(user) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2E8B57;">¡Bienvenido a Plantas Papaloapan! 🌿</h1>
        <p>Hola <strong>${user.nombre}</strong>,</p>
        <p>Estamos emocionados de tenerte en nuestra comunidad de amantes de las plantas.</p>
        <p>Con tu cuenta podrás:</p>
        <ul>
          <li>🌱 Registrar y monitorear tus plantas</li>
          <li>📱 Recibir recordatorios de cuidados</li>
          <li>📸 Compartir tu progreso en redes sociales</li>
          <li>👥 Conectar con otros jardineros</li>
        </ul>
        <p>¡Comienza agregando tu primera planta!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/agregar-planta" 
             style="background-color: #2E8B57; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Agregar Mi Primera Planta
          </a>
        </div>
        <p>Saludos,<br>El equipo de Plantas Papaloapan</p>
      </div>
    `;
  }

  getPasswordResetTemplate(user, resetURL) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2E8B57;">Restablecer Contraseña</h1>
        <p>Hola <strong>${user.nombre}</strong>,</p>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" 
             style="background-color: #2E8B57; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Restablecer Contraseña
          </a>
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
        <p>El enlace expirará en 1 hora.</p>
        <p>Saludos,<br>El equipo de Plantas Papaloapan</p>
      </div>
    `;
  }

  getPlantAlertTemplate(user, plant, alertType) {
    const alertMessages = {
      riego: `necesita riego`,
      fertilizacion: `necesita fertilización`,
      poda: `necesita poda`,
      salud: `tiene problemas de salud`
    };

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF6B6B;">⚠️ Alerta de Planta</h1>
        <p>Hola <strong>${user.nombre}</strong>,</p>
        <p>Tu planta <strong>"${plant.nombrePersonalizado}"</strong> ${alertMessages[alertType]}.</p>
        <div style="background-color: #FFF3CD; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Acción requerida:</strong> Por favor revisa tu planta y realiza los cuidados necesarios.</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/plantas/${plant._id}" 
             style="background-color: #2E8B57; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Ver Detalles de la Planta
          </a>
        </div>
        <p>Saludos,<br>El equipo de Plantas Papaloapan</p>
      </div>
    `;
  }
}

export default new EmailService();