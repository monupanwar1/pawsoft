// types.ts
export type Pet = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string | null;
};

export type PetEssentials = Omit<Pet, 'id'>;
