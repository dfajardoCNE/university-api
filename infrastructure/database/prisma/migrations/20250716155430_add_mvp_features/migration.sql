/*
  Warnings:

  - You are about to drop the column `grade` on the `student_section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "academicStatus" VARCHAR(20) NOT NULL DEFAULT 'good_standing',
ADD COLUMN     "gpa" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "student_section" DROP COLUMN "grade",
ADD COLUMN     "currentGrade" DOUBLE PRECISION,
ADD COLUMN     "finalGrade" DOUBLE PRECISION,
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "concept" VARCHAR(100) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "paymentMethod" VARCHAR(50) NOT NULL,
    "referenceNumber" VARCHAR(100),
    "termId" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "concept" VARCHAR(100) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "termId" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
