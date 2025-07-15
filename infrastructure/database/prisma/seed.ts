import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrador del sistema',
    },
  });

  const professorRole = await prisma.role.upsert({
    where: { name: 'profesor' },
    update: {},
    create: {
      name: 'profesor',
      description: 'Profesor de la universidad',
    },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: 'estudiante' },
    update: {},
    create: {
      name: 'estudiante',
      description: 'Estudiante de la universidad',
    },
  });

  // Crear usuario administrador por defecto
  const adminPerson = await prisma.person.upsert({
    where: { email: 'admin@universidad.edu' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'Sistema',
      email: 'admin@universidad.edu',
    },
  });

  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
      personId: adminPerson.id,
      roleId: adminRole.id,
    },
  });

  // Crear tipos de notificación
  await prisma.notificationType.upsert({
    where: { name: 'Info' },
    update: {},
    create: {
      name: 'Info',
      description: 'Información general',
    },
  });

  await prisma.notificationType.upsert({
    where: { name: 'Assignment' },
    update: {},
    create: {
      name: 'Assignment',
      description: 'Asignación de tarea',
    },
  });

  await prisma.notificationType.upsert({
    where: { name: 'Exam' },
    update: {},
    create: {
      name: 'Exam',
      description: 'Examen programado',
    },
  });

  await prisma.notificationType.upsert({
    where: { name: 'Practice' },
    update: {},
    create: {
      name: 'Practice',
      description: 'Práctica programada',
    },
  });

  console.log('Base de datos inicializada con datos semilla');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });