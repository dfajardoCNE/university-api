import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Deshabilitar restricciones de clave foránea temporalmente
  await prisma.$executeRawUnsafe('SET session_replication_role = replica;');

  // Vaciar todas las tablas (ajusta el orden si tienes tablas adicionales)
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE 
      "notification_recipient",
      "notification",
      "post",
      "thread",
      "submission",
      "assignment",
      "student_section",
      "section",
      "session_time",
      "course",
      "student",
      "professor",
      "user",
      "person",
      "role",
      "invoice",
      "payment",
      "term",
      "classroom",
      "campus",
      "career",
      "department",
      "faculty",
      "university"
    RESTART IDENTITY CASCADE;
  `);

  // Restaurar restricciones de clave foránea
  await prisma.$executeRawUnsafe('SET session_replication_role = DEFAULT;');

  console.log('¡Base de datos vaciada exitosamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// npx ts-node ./infrastructure/database/prisma/truncate.ts
