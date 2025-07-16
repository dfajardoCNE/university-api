import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de prefijo global para la API
  app.setGlobalPrefix('api');

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Universidad API')
    .setDescription('API para el sistema de gestión universitaria desarrollada con NestJS, Prisma y PostgreSQL')
    .setVersion('1.0')
    .addTag('autenticación', 'Endpoints para autenticación y gestión de usuarios')
    .addTag('personas', 'Gestión de información personal')
    .addTag('roles', 'Gestión de roles del sistema')
    .addTag('inscripciones', 'Gestión de inscripciones de estudiantes')
    .addTag('universidad', 'Gestión de información de la universidad')
    .addTag('facultades', 'Gestión de facultades académicas')
    .addTag('departamentos', 'Gestión de departamentos académicos')
    .addTag('campus', 'Gestión de campus universitarios')
    .addTag('aulas', 'Gestión de aulas y espacios físicos')
    .addTag('carreras', 'Gestión de carreras universitarias')
    .addTag('cursos', 'Gestión de cursos y asignaturas')
    .addTag('prerrequisitos', 'Gestión de prerrequisitos de cursos')
    .addTag('estudiantes', 'Gestión de estudiantes')
    .addTag('profesores', 'Gestión de profesores')
    .addTag('secciones', 'Gestión de secciones de cursos')
    .addTag('periodos', 'Gestión de periodos académicos')
    .addTag('horarios', 'Gestión de horarios de clases')
    .addTag('solicitudes', 'Gestión de solicitudes de admisión')
    .addTag('documentos', 'Gestión de documentos de solicitudes')
    .addTag('exámenes', 'Gestión de exámenes')
    .addTag('prácticas', 'Gestión de prácticas')
    .addTag('tareas', 'Gestión de tareas y asignaciones')
    .addTag('entregas', 'Gestión de entregas de trabajos')
    .addTag('evaluaciones', 'Evaluaciones de profesores')
    .addTag('foros', 'Gestión de hilos de discusión')
    .addTag('publicaciones', 'Gestión de publicaciones en foros')
    .addTag('notificaciones', 'Sistema de notificaciones')
    .addTag('reportes', 'Sistema de reportes de contenido')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Ingrese su token JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configuración de CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
  console.log(`Aplicación corriendo en: ${await app.getUrl()}`);
}
bootstrap();