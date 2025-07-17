import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  // Universidad, facultades, departamentos, campus, aulas
  const university = await prisma.university.create({
    data: {
      name: 'Universidad Dominicana O&M',
      country: 'República Dominicana',
      faculties: {
        create: [
          {
            name: 'Facultad de Ciencias Económicas y Administrativas',
            departments: {
              create: [
                { name: 'Departamento de Contabilidad' },
                { name: 'Departamento de Administración' },
                { name: 'Departamento de Economía' },
                { name: 'Departamento de Mercadotecnia' },
              ],
            },
          },
          {
            name: 'Facultad de Ingeniería',
            departments: {
              create: [
                { name: 'Departamento de Ciencias de la Computación' },
              ],
            },
          },
          {
            name: 'Facultad de Turismo y Hotelería',
            departments: {
              create: [
                { name: 'Departamento de Administración de Empresas Turísticas y Hoteleras' },
              ],
            },
          },
          {
            name: 'Facultad de Derecho',
            departments: {
              create: [
                { name: 'Departamento de Derecho' },
              ],
            },
          },
        ],
      },
      campuses: {
        create: [
          {
            name: 'Sede Central',
            location: 'Santo Domingo',
            classrooms: {
              create: Array.from({ length: 20 }).map((_, i) => ({
                name: `Aula ${100 + i}`,
                capacity: 40 + i,
              })),
            },
          },
          {
            name: 'Santiago de los Caballeros',
            location: 'Santiago de los Caballeros',
            classrooms: {
              create: Array.from({ length: 10 }).map((_, i) => ({
                name: `Aula ${200 + i}`,
                capacity: 30 + i,
              })),
            },
          },
          {
            name: 'Moca',
            location: 'Moca',
            classrooms: {
              create: Array.from({ length: 10 }).map((_, i) => ({
                name: `Aula ${300 + i}`,
                capacity: 30 + i,
              })),
            },
          },
        ],
      },
    },
    include: {
      faculties: { include: { departments: true } },
      campuses: { include: { classrooms: true } },
    },
  });

  // Periodo académico
  const term = await prisma.term.create({
    data: {
      name: '2025-2',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-12-15'),
    },
  });

  // Roles (upsert para evitar duplicados)
  const [adminRole, professorRole, studentRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: { name: 'admin', description: 'Administrador' },
    }),
    prisma.role.upsert({
      where: { name: 'profesor' },
      update: {},
      create: { name: 'profesor', description: 'Profesor' },
    }),
    prisma.role.upsert({
      where: { name: 'estudiante' },
      update: {},
      create: { name: 'estudiante', description: 'Estudiante' },
    }),
  ]);

  // Admin
  const adminUniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const adminPerson = await prisma.person.create({
    data: {
      firstName: 'Admin',
      lastName: 'Principal',
      email: `admin_${adminUniqueSuffix}@univ.edu`,
    },
  });
  const adminUser = await prisma.user.create({
    data: {
      username: `admin_${adminUniqueSuffix}`,
      passwordHash: await bcrypt.hash('admin123', 10),
      personId: adminPerson.id,
      roleId: adminRole.id,
    },
  });

  // Obtener departamentos
  const departments = await prisma.department.findMany();

  // Carreras
  const careers = [];
  for (const dept of departments) {
    let careerName;
    if (dept.name === 'Departamento de Administración de Empresas Turísticas y Hoteleras') {
      careerName = 'Licenciatura en Administración de Empresas Turísticas y Hoteleras';
    } else if (dept.name === 'Departamento de Derecho') {
      careerName = 'Licenciatura en Derecho';
    } else {
      careerName = `Carrera de ${dept.name.replace('Departamento de ', '')}`;
    }
    const career = await prisma.career.create({
      data: {
        departmentId: dept.id,
        name: careerName,
        description: `Descripción de ${careerName}`,
      },
    });
    careers.push(career);
  }

  // Profesores y usuarios
  const professors = [];
  for (let i = 1; i <= 10; i++) {
    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const person = await prisma.person.create({
      data: {
        firstName: `Profesor${i}`,
        lastName: `Apellido${i}`,
        email: `profesor${i}_${uniqueSuffix}@univ.edu`,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: `prof${i}_${uniqueSuffix}`,
        passwordHash: await bcrypt.hash('prof123', 10),
        personId: person.id,
        roleId: professorRole.id,
      },
    });
    const professor = await prisma.professor.create({
      data: {
        personId: person.id,
        hireDate: randomDate(new Date('2015-01-01'), new Date('2024-01-01')),
      },
    });
    professors.push({ person, user, professor });
  }

  // Estudiantes y usuarios
  const students = [];
  for (let i = 1; i <= 50; i++) {
    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const matricula = `2025${String(i).padStart(4, '0')}_${uniqueSuffix}`;
    const person = await prisma.person.create({
      data: {
        firstName: `Estudiante${i}`,
        lastName: `Apellido${i}`,
        email: `estudiante${i}_${uniqueSuffix}@univ.edu`,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: matricula,
        passwordHash: await bcrypt.hash('est123', 10),
        personId: person.id,
        roleId: studentRole.id,
      },
    });
    // Asignar carrera y campus aleatorio
    const career = careers[Math.floor(Math.random() * careers.length)];
    const campus = university.campuses[Math.floor(Math.random() * university.campuses.length)];
    const student = await prisma.student.create({
      data: {
        personId: person.id,
        careerId: career.id,
        campusId: campus.id,
        enrollmentDate: randomDate(new Date('2022-01-01'), new Date('2025-01-01')),
        status: 'activo',
      },
    });
    students.push({ person, user, student, career });
  }

  // Cursos y secciones por carrera
  for (const career of careers) {
    const courses = [];
    for (let i = 1; i <= 30; i++) {
      const code = `C${career.id}_${String(i).padStart(3, '0')}`;
      const course = await prisma.course.create({
        data: {
          careerId: career.id,
          code,
          name: `Curso ${i} de ${career.name}`,
          credits: 3 + (i % 3),
        },
      });
      courses.push(course);
    }
    // Secciones por curso
    for (const course of courses) {
      for (let j = 1; j <= 10; j++) {
        const sessionTime = await prisma.sessionTime.create({
          data: {
            dayOfWeek: ((j - 1) % 5) + 1,
            startTime: new Date(`2025-08-0${((j - 1) % 5) + 1}T08:00:00Z`),
            endTime: new Date(`2025-08-0${((j - 1) % 5) + 1}T10:00:00Z`),
          },
        });
        const professor = professors[Math.floor(Math.random() * professors.length)].professor;
        // Seleccionar aula del mismo campus que la carrera (para mayor realismo)
        const careerCampus = university.campuses[Math.floor(Math.random() * university.campuses.length)];
        const classroom = careerCampus.classrooms[Math.floor(Math.random() * careerCampus.classrooms.length)];
        await prisma.section.create({
          data: {
            courseId: course.id,
            termId: term.id,
            sessionTimeId: sessionTime.id,
            professorId: professor.id,
            classroomId: classroom.id,
          },
        });
      }
    }
  }

  console.log('Base de datos poblada con datos realistas para la Universidad Dominicana O&M: 50 estudiantes, 10 profesores, 7 carreras, 30 cursos por carrera y 10 secciones por curso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });