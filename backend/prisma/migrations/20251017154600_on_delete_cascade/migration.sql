-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_patientId_fkey";

-- CreateIndex
CREATE INDEX "Note_patientId_idx" ON "Note"("patientId");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
