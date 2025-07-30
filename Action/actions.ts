'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { PetEssentials } from '@/lib/types';
import { currentUser } from '@clerk/nextjs/server';

// Get all pets for the current user
export async function getAllPets() {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const ownerId = user.id;
  const pets = await prisma.pet.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
  });

  return pets;
}

// Add new pet
export async function addPet(formData: PetEssentials) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const ownerId = user.id;
  await prisma.pet.create({
    data: {
      ...formData,
      ownerId,
    },
  });

  revalidatePath('/');
}

// Edit a pet (only if owned by user)
export async function editPet(id: string, formData: PetEssentials) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const ownerId = user.id;

  const pet = await prisma.pet.findUnique({ where: { id } });
  if (!pet || pet.ownerId !== ownerId) throw new Error('Unauthorized');

  await prisma.pet.update({
    where: { id },
    data: formData,
  });

  revalidatePath('/');
}

// Delete a pet (only if owned by user)
export async function deletePet(id: string) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const ownerId = user.id;

  const pet = await prisma.pet.findUnique({ where: { id } });
  if (!pet || pet.ownerId !== ownerId) throw new Error('Unauthorized');

  await prisma.pet.delete({ where: { id } });

  revalidatePath('/');
}
