'use client';
import { addPet, deletePet, editPet } from '@/Action/actions';
import PetButton from '@/components/PetButtons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pet } from '@/lib/types';
import { useState } from 'react';


type Props = {
  pets?: Pet[];
}; 

export default function PawSoftDashboard({ pets }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchPet, setSearchPet] = useState('');

  const filteredPets = pets?.filter((pet) =>
    pet.name.toLowerCase().includes(searchPet.toLowerCase()),
  );

  const totalPets = pets?.length;

  return (
    <section className="container mx-auto py-20  mt-10 px-4 bg-gray-100 dark:bg-neutral-900 rounded-md min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6">
        {/* Sidebar */}
        <div className=" border h-96 md:h-[950px] border-gray-200 dark:border-neutral-800 rounded-lg   shadow-sm flex flex-col">
          <div className="p-4 border-b overflow-y-auto scrollbar-none border-gray-200 dark:border-neutral-800">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
              🐾 Pets:{totalPets}
            </h2>
            <div className="mb-4 text-center ">
              <Input
                placeholder="Search your Pet"
                value={searchPet}
                onChange={(e) => setSearchPet(e.target.value)}
                className="rounded-md bg-white dark:bg-neutral-900 focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-none"
                type="text"
              />
            </div>
            <div className="space-y-2">
              {filteredPets?.length === 0 ? (
                <p className="text-muted-foreground">No pets found</p>
              ) : (
                filteredPets?.map((pet) => (
                  <Card
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`transition-shadow hover:bg-slate-50 dark:hover:bg-neutral-700 border-2 `}
                  >
                    <CardContent className="px-4 py-2 ">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-16 h-16 overflow-hidden rounded-full border border-gray-200">
                          <AvatarImage src={pet.imageUrl} alt={pet.name} />
                          <AvatarFallback className="w-full h-full object-contain">
                            {pet.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white ">
                            {pet.name}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="p-4 flex items-center justify-between mt-auto">
            <PetButton
              actionType="add"
              onSubmit={async (data) => {
                await addPet(data);
              }}
            >
              AddPet
            </PetButton>
          </div>
        </div>

        {/* Main Content */}
        {selectedPet ? (
          <main className="flex flex-col space-y-6">
            {/* Pet Header */}
            <Card className="border-2  shadow-sm dark:bg-neutral-900">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 overflow-hidden rounded-full border border-gray-200">
                      <AvatarImage
                        src={selectedPet.imageUrl}
                        alt={selectedPet.name}
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback className="flex items-center justify-center w-full h-full bg-orange-100 text-orange-600 text-xl font-semibold">
                        {selectedPet.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedPet.name}
                      </h2>

                      <p className="font-semibold"> Age: {selectedPet.age}</p>
                      <p className="font-semibold">
                        {' '}
                        OwnerName: {selectedPet.ownerName}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <PetButton
                      actionType="edit"
                      pet={selectedPet}
                      onSubmit={async (data) => {
                        if (!selectedPet) return;
                        await editPet(selectedPet.id, data);
                        setSelectedPet(null);
                      }}
                    >
                      Edit
                    </PetButton>
                    <PetButton
                      actionType="delete"
                      onDelete={async () => {
                        if (!selectedPet) return;
                        await deletePet(selectedPet.id);
                        setSelectedPet(null); // remove from UI after deletion
                      }}
                    >
                      Delete
                    </PetButton>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Notes Section */}
            <Card className="border-orange-200 dark:border-orange-400 shadow-sm dark:bg-neutral-900">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  📝 Notes
                </h3>
              </CardHeader>
              <CardContent>
                <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedPet.notes || 'No notes available for this pet.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
        ) : (
          <div className="flex justify-center">
            <p className="text-muted-foreground italic">No pets selected</p>
          </div>
        )}
      </div>
    </section>
  );
}
