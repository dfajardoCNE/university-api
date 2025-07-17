@startuml

' Actors
actor Admin
actor Profesor
actor Estudiante
actor Usuario
actor Sistema

' Application
Admin --> (Crear aplicación)
Admin --> (Eliminar aplicación)
Admin --> (Actualizar aplicación)
Usuario --> (Obtener todas las aplicaciones)
Usuario --> (Obtener aplicación por ID)
Usuario --> (Obtener aplicaciones por persona)
Usuario --> (Obtener aplicaciones por estado)

' Application Document
Usuario --> (Crear documento)
Usuario --> (Eliminar documento)
Usuario --> (Obtener documento por ID)
Usuario --> (Obtener documentos por aplicación)

' Assignment
Profesor --> (Crear asignación)
Profesor --> (Eliminar asignación)
Profesor --> (Actualizar asignación)
Usuario --> (Obtener todas las asignaciones)
Usuario --> (Obtener asignación por ID)
Usuario --> (Obtener asignaciones por curso)

' Campus
Admin --> (Crear campus)
Admin --> (Eliminar campus)
Admin --> (Actualizar campus)
Usuario --> (Obtener todos los campus)
Usuario --> (Obtener campus por ID)

' Career
Admin --> (Crear carrera)
Admin --> (Eliminar carrera)
Admin --> (Actualizar carrera)
Usuario --> (Obtener todas las carreras)
Usuario --> (Obtener carrera por ID)
Usuario --> (Obtener carreras por departamento)

' Career-Campus
Admin --> (Crear carrera-campus)
Admin --> (Eliminar carrera-campus)
Usuario --> (Obtener todos los carrera-campus)
Usuario --> (Obtener carrera-campus por campus)
Usuario --> (Obtener carrera-campus por carrera)

' Classroom
Admin --> (Crear aula)
Admin --> (Eliminar aula)
Admin --> (Actualizar aula)
Usuario --> (Obtener todas las aulas)
Usuario --> (Obtener aula por ID)
Usuario --> (Obtener aulas por campus)

' Course
Admin --> (Crear curso)
Admin --> (Eliminar curso)
Admin --> (Actualizar curso)
Usuario --> (Obtener todos los cursos)
Usuario --> (Obtener curso por ID)
Usuario --> (Obtener cursos por carrera)

' Course Prerequisite
Admin --> (Crear prerrequisito de curso)
Admin --> (Eliminar prerrequisito de curso)
Usuario --> (Obtener cursos por prerrequisito)
Usuario --> (Obtener prerrequisitos por curso)

' Dashboard
Admin --> (Obtener dashboard admin)
Profesor --> (Obtener dashboard profesor)
Estudiante --> (Obtener dashboard estudiante)

' Department
Admin --> (Crear departamento)
Admin --> (Eliminar departamento)
Admin --> (Actualizar departamento)
Usuario --> (Obtener todos los departamentos)
Usuario --> (Obtener departamento por ID)
Usuario --> (Obtener departamentos por facultad)

' Exam
Profesor --> (Crear examen)
Profesor --> (Eliminar examen)
Profesor --> (Actualizar examen)
Usuario --> (Obtener todos los exámenes)
Usuario --> (Obtener examen por ID)
Usuario --> (Obtener exámenes por curso)
Usuario --> (Obtener exámenes por profesor)

' Faculty
Admin --> (Crear facultad)
Admin --> (Eliminar facultad)
Admin --> (Actualizar facultad)
Usuario --> (Obtener todas las facultades)
Usuario --> (Obtener facultad por ID)
Usuario --> (Obtener facultades por universidad)

' Invoice
Usuario --> (Crear factura)
Usuario --> (Verificar estado de pago)

' Notification
Usuario --> (Crear notificación)
Usuario --> (Eliminar notificación)
Usuario --> (Obtener notificaciones por usuario)

' Payment
Usuario --> (Crear pago)

' Person
Admin --> (Crear persona)
Admin --> (Eliminar persona)
Admin --> (Actualizar persona)
Usuario --> (Obtener todas las personas)
Usuario --> (Obtener persona por ID)

' Post
Usuario --> (Crear post)
Usuario --> (Eliminar post)
Usuario --> (Actualizar post)
Usuario --> (Obtener post por ID)
Usuario --> (Obtener posts por hilo)

' Practice
Profesor --> (Crear práctica)
Profesor --> (Eliminar práctica)
Profesor --> (Actualizar práctica)
Usuario --> (Obtener todas las prácticas)
Usuario --> (Obtener práctica por ID)
Usuario --> (Obtener prácticas por curso)

' Professor
Admin --> (Crear profesor)
Admin --> (Eliminar profesor)
Admin --> (Actualizar profesor)
Usuario --> (Obtener todos los profesores)
Usuario --> (Obtener profesor por ID)

' Report
Usuario --> (Crear reporte)
Admin --> (Actualizar estado de reporte)
Usuario --> (Obtener todos los reportes)
Usuario --> (Obtener reportes por estado)

' Role
Admin --> (Crear rol)
Admin --> (Eliminar rol)
Admin --> (Actualizar rol)
Usuario --> (Obtener todos los roles)
Usuario --> (Obtener rol por ID)

' Section
Admin --> (Crear sección)
Admin --> (Eliminar sección)
Admin --> (Actualizar sección)
Usuario --> (Obtener todas las secciones)
Usuario --> (Obtener sección por ID)
Usuario --> (Obtener secciones por curso)
Usuario --> (Obtener secciones por profesor)

' Session Time
Admin --> (Crear horario)
Admin --> (Eliminar horario)
Admin --> (Actualizar horario)
Usuario --> (Obtener todos los horarios)
Usuario --> (Obtener horario por ID)
Usuario --> (Obtener horarios por día)

' Student
Admin --> (Crear estudiante)
Admin --> (Eliminar estudiante)
Admin --> (Actualizar estudiante)
Admin --> (Actualizar estado académico)
Usuario --> (Obtener todos los estudiantes)
Usuario --> (Obtener estudiante por ID)
Usuario --> (Obtener estudiantes por carrera)
Usuario --> (Calcular GPA estudiante)

' Student Section
Usuario --> (Crear sección de estudiante)
Usuario --> (Eliminar sección de estudiante)
Usuario --> (Actualizar sección de estudiante)
Usuario --> (Obtener todas las secciones de estudiante)
Usuario --> (Obtener sección de estudiante por ID)
Usuario --> (Obtener secciones de estudiante por sección)
Usuario --> (Obtener secciones de estudiante por estudiante)
Usuario --> (Validar prerrequisitos)

' Submission
Estudiante --> (Crear entrega)
Estudiante --> (Eliminar entrega)
Estudiante --> (Actualizar entrega)
Usuario --> (Obtener todas las entregas)
Usuario --> (Obtener entrega por ID)
Usuario --> (Obtener entregas por asignación)
Usuario --> (Obtener entregas por estudiante)

' Teacher Rating
Estudiante --> (Crear calificación)
Estudiante --> (Eliminar calificación)
Estudiante --> (Actualizar calificación)
Usuario --> (Obtener calificaciones por profesor)
Usuario --> (Obtener calificaciones por estudiante)

' Term
Admin --> (Crear periodo)
Admin --> (Eliminar periodo)
Admin --> (Actualizar periodo)
Usuario --> (Obtener todos los periodos)
Usuario --> (Obtener periodo actual)
Usuario --> (Obtener periodo por ID)

' Thread
Usuario --> (Crear hilo)
Usuario --> (Eliminar hilo)
Usuario --> (Actualizar hilo)
Usuario --> (Obtener todos los hilos)
Usuario --> (Obtener hilo por ID)
Usuario --> (Obtener hilos por usuario)

' University
Admin --> (Crear universidad)
Admin --> (Eliminar universidad)
Admin --> (Actualizar universidad)
Usuario --> (Obtener todas las universidades)
Usuario --> (Obtener universidad por ID)

' User
Admin --> (Eliminar usuario)
Admin --> (Actualizar usuario)
Usuario --> (Obtener todos los usuarios)
Usuario --> (Obtener usuario por ID)
Usuario --> (Registrar usuario)
Usuario --> (Registrar usuario profesor)
Usuario --> (Registrar usuario estudiante)
Usuario --> (Solicitar restablecimiento de contraseña)
Usuario --> (Restablecer contraseña)

@enduml