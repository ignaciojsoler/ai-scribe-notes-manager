import prisma from "../config/db.config";

export const getPatients = async () => {
  return await prisma.patient.findMany();
}