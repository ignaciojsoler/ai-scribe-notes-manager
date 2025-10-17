import prisma from "../config/db";

export const getPatients = async () => {
  return await prisma.patient.findMany();
}