-- Triggers para actualizar el campo updatedAt y manejar soft delete

-- 1. ACTUALIZAR UpdatedAt TRIGGER para University
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_university_update_timestamp
BEFORE UPDATE ON university
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- 2. SOFT DELETE TRIGGER para University
CREATE OR REPLACE FUNCTION soft_delete()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE university SET "deletedAt" = NOW() WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_university_soft_delete
INSTEAD OF DELETE ON university
FOR EACH ROW
EXECUTE FUNCTION soft_delete();

-- Repite estos triggers para las demás tablas que necesiten esta funcionalidad

-- 3. NOTIFICACIONES AUTOMÁTICAS para Assignment
CREATE OR REPLACE FUNCTION notify_assignment_creation()
RETURNS TRIGGER AS $$
DECLARE
    notification_id INT;
    notification_type_id INT;
BEGIN
    -- Obtener el ID del tipo de notificación
    SELECT id INTO notification_type_id FROM notification_type WHERE name = 'Assignment';
    
    -- Crear notificación
    INSERT INTO notification(
        "notificationTypeId", 
        title, 
        message, 
        link, 
        "createdBy"
    ) VALUES (
        notification_type_id,
        'Nueva asignación: ' || NEW.title,
        'Se ha publicado una nueva asignación en el curso.',
        '/courses/' || NEW."courseId" || '/assignments/' || NEW.id,
        NEW."createdBy"
    ) RETURNING id INTO notification_id;
    
    -- Entregar notificación a estudiantes activos
    INSERT INTO notification_recipient("notificationId", "userId")
    SELECT 
        notification_id,
        u.id
    FROM student s
    JOIN "user" u ON u."personId" = s."personId"
    JOIN course c ON c.id = NEW."courseId"
    WHERE s."careerId" = c."careerId"
      AND s.status = 'Active';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_assignment_after_insert
AFTER INSERT ON assignment
FOR EACH ROW
EXECUTE FUNCTION notify_assignment_creation();

-- Repite para Exam y Practice según sea necesario