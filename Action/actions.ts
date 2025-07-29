'use server';
// actions/petActions.ts

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';import { PetEssentials } from '@/lib/types';

export async function getAllPets(){
  return await prisma.pet.findMany()
  revalidatePath('/');
}

export async function addPet(formData: PetEssentials) {
  await prisma.pet.create({ data: formData });
  revalidatePath('/');
}

export async function editPet(id: string, formData: PetEssentials) {
  await prisma.pet.update({ where: { id }, data: formData });
  revalidatePath('/');
}

export async function deletePet(id: string) {
  await prisma.pet.delete({ where: { id } });
  revalidatePath('/');
}
