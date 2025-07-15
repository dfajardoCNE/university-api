const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function applyTriggers() {
  const prisma = new PrismaClient();
  
  try {
    // Leer el archivo de triggers
    const triggersPath = path.join(__dirname, 'triggers.sql');
    const triggersSql = fs.readFileSync(triggersPath, 'utf8');
    
    // Ejecutar los triggers SQL directamente en la base de datos
    await prisma.$executeRawUnsafe(triggersSql);
    
    console.log('Triggers aplicados correctamente');
  } catch (error) {
    console.error('Error al aplicar triggers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

applyTriggers();