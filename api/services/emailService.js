const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendEmail({ to, subject, html, text }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Nexora-Hug" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html
      });
      console.log('Email enviado:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error enviando email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPaymentConfirmation({ to, amount, affiliateCode }) {
    return this.sendEmail({
      to,
      subject: '💰 Pago de Afiliado Procesado - Nexora-Hug',
      html: `
        <h2>¡Pago Procesado!</h2>
        <p>Tu pago de afiliado ha sido procesado exitosamente.</p>
        <p><strong>Monto:</strong> $${amount} MXN</p>
        <p><strong>Código de Afiliado:</strong> ${affiliateCode}</p>
        <p>Gracias por ser parte de Nexora-Hug 🚀</p>
      `,
      text: `Pago procesado: $${amount} MXN - Código: ${affiliateCode}`
    });
  }

  async sendUpgradeEmail({ to, plan }) {
    return this.sendEmail({
      to,
      subject: '🎉 Upgrade a Pro - Nexora-Hug',
      html: `
        <h2>¡Bienvenido a ${plan}!</h2>
        <p>Tu cuenta ha sido actualizada exitosamente.</p>
        <p>Disfruta de todas las características premium.</p>
      `,
      text: `Upgrade a ${plan} completado`
    });
  }
}

module.exports = new EmailService();

