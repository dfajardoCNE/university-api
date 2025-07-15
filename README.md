# Universidad API

API para el sistema de gestión universitaria desarrollada con NestJS, Prisma y PostgreSQL.

## Descripción

Este proyecto implementa una API RESTful para la gestión de una universidad, siguiendo los principios de Clean Architecture.

## Tecnologías

- **Backend**: Node.js con NestJS
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JWT con roles (estudiante, profesor, admin)
- **Documentación**: Swagger

## Estructura del Proyecto

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

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/university-api.git
   cd university-api
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. Generar el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

5. Ejecutar migraciones de base de datos:
   ```bash
   npx prisma migrate dev
   ```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Documentación API

La documentación de la API está disponible en Swagger:
```
http://localhost:3000/api/docs
```

## Roles y Permisos

- **Admin**: Acceso completo a todas las funcionalidades
- **Profesor**: Gestión de cursos, calificaciones y materiales
- **Estudiante**: Consulta de cursos, inscripciones y calificaciones

## Licencia

Este proyecto está bajo la Licencia MIT.