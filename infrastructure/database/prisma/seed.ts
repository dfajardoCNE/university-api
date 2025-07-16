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

  // Crear notificaciones de ejemplo
  await prisma.notification.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: adminPerson.id,
      title: 'Bienvenido al sistema',
      message: 'Sistema inicializado correctamente',
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