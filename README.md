<div align="center">

# 🎓 Universidad API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

API RESTful para el sistema de gestión universitaria desarrollada con arquitectura limpia.

[Características](#características) • [Instalación](#instalación) • [Uso](#ejecución) • [Documentación](#documentación-api) • [Licencia](#licencia)

</div>

## 📋 Descripción

Este proyecto implementa una API RESTful para la gestión de una universidad, siguiendo los principios de Clean Architecture. Proporciona un sistema completo para administrar estudiantes, profesores, cursos, calificaciones y más.

## 🛠️ Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) |
| **Base de datos** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) |
| **Autenticación** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) con roles (estudiante, profesor, admin) |
| **Documentación** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) |

## 📁 Estructura del Proyecto

```
src/
├── domain/              # Reglas de negocio y entidades
│   ├── entities/        # Entidades del dominio
│   ├── repositories/    # Interfaces de repositorios
│   └── use-cases/       # Casos de uso
├── infrastructure/      # Implementaciones externas
│   ├── database/        # Configuración de base de datos
│   │   ├── prisma/      # Cliente y esquema de Prisma
│   │   └── repositories/# Implementación de repositorios
│   ├── auth/            # Servicios de autenticación
│   └── services/        # Servicios externos
├── application/         # Lógica de aplicación
│   ├── dto/             # Objetos de transferencia de datos
│   ├── mappers/         # Convertidores entre entidades y DTOs
│   └── validators/      # Validadores
├── interfaces/          # Adaptadores de interfaz
│   ├── controllers/     # Controladores REST
│   └── routes/          # Definición de rutas
└── shared/              # Utilidades compartidas
    ├── guards/          # Guards de autenticación
    ├── interceptors/    # Interceptores
    └── utils/           # Utilidades generales
```

## 🚀 Instalación

<details>
<summary>Prerrequisitos</summary>

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

</details>

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/dfajardoCNE/university-api.git
   cd university-api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Generar el cliente de Prisma:**
   ```bash
   npx prisma generate
   ```

5. **Ejecutar migraciones de base de datos:**
   ```bash
   npx prisma migrate dev
   ```

## ▶️ Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

> 💡 **Tip**: Usa `npm run start:debug` para ejecutar con soporte de depuración.

## 📚 Documentación API

La documentación interactiva de la API está disponible en Swagger:

```
http://localhost:3000/api/docs
```

<div align="center">

![Swagger UI](shared/utils/university-api.png)

</div>

## 🔐 Roles y Permisos

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **👑 Admin** | Administrador del sistema | Acceso completo a todas las funcionalidades |
| **👨‍🏫 Profesor** | Personal docente | Gestión de cursos, calificaciones y materiales |
| **👨‍🎓 Estudiante** | Alumnos registrados | Consulta de cursos, inscripciones y calificaciones |

## 📄 Licencia

[![Licencia MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

### ¿Encontraste un error o tienes una sugerencia?

[![Reportar Issue](https://img.shields.io/badge/Reportar_Issue-GitHub-green.svg)](https://github.com/dfajardoCNE/university-api/issues/new)

</div>