import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

const userData = {
  pets: {
    create: [
      {
        name: 'Benjamin',
        ownerName: 'John Doe',
        imageUrl:
          'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=100&w=1935',
        age: 2,
        notes:
          "Doesn't like to be touched on the belly. Plays well with other dogs.",
      },
      {
        name: 'Richard',
        ownerName: 'Josephine Dane',
        imageUrl:
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1964',
        age: 5,
        notes: 'Needs medication twice a day.',
      },
      {
        name: 'Anna',
        ownerName: 'Frank Doe',
        imageUrl:
          'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970',
        age: 4,
        notes: 'Allergic to chicken.',
      },
    ],
  },
};

async function main() {
  try {
    console.log('Start seeding ...');

    // Create pets directly (no user creation here, just pets)
    await prisma.pet.createMany({
      data: userData.pets.create,
    });

    console.log('Seeding finished.');
  } catch (e) {
    console.error('Error seeding:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
