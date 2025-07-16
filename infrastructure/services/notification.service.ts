import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;
  private templatesDir: string;

  constructor(private configService: ConfigService) {
    // Configurar el transporter de nodemailer
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: this.configService.get<boolean>('EMAIL_SECURE'),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    // Directorio de plantillas de email
    this.templatesDir = path.join(process.cwd(), 'templates/emails');
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Leer la plantilla
      const templatePath = path.join(this.templatesDir, `${options.template}.hbs`);
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      
      // Compilar la plantilla con Handlebars
      const template = handlebars.compile(templateSource);
      const html = template(options.context);

      // Enviar el email
      await this.transporter.sendMail({
        from: `"${this.configService.get<string>('EMAIL_FROM_NAME')}" <${this.configService.get<string>('EMAIL_FROM')}>`,
        to: options.to,
        subject: options.subject,
        html,
      });

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendNotification(userId: number, title: string, message: string): Promise<boolean> {
    try {
      // Aquí implementaríamos la lógica para guardar la notificación en la base de datos
      // y potencialmente enviarla por otros canales (push notifications, etc.)
      
      // Por ahora, solo simulamos el éxito
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }
}