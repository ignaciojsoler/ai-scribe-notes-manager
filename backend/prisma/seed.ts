import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const patients = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      dateOfBirth: new Date('1985-06-15'),
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      dateOfBirth: new Date('1990-11-02'),
    },
    {
      name: 'Jim Beam',
      email: 'jim.beam@example.com',
      dateOfBirth: new Date('1978-03-22'),
    },
  ];

  for (const patient of patients) {
    await prisma.patient.upsert({
      where: { email: patient.email },
      update: {},
      create: patient,
    });
  }

  console.log('Patients seeded successfully ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
