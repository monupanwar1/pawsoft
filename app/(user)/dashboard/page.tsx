'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CreditCard, Edit, Plus, Tag } from 'lucide-react';
import { useState } from 'react';

type Pet = {
  id: string;
  name: string;
  avatar?: string;
  notes: string;
};

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    avatar: '/placeholder.svg?height=40&width=40',
    notes:
      '🐶 Friendly golden retriever. Loves treats and belly rubs. Last checkup went well.',
  },
  {
    id: '2',
    name: 'Whiskers',
    avatar: '/placeholder.svg?height=40&width=40',
    notes: '🐱 Indoor cat, very playful. Needs dental cleaning next visit.',
  },
  {
    id: '3',
    name: 'Max',
    avatar: '/placeholder.svg?height=40&width=40',
    notes:
      '🦮 Large breed dog. Regular exercise routine. Vaccination due next month.',
  },
];

export default function PawSoftDashboard() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  return (
    <section className="container mx-auto py-20  mt-10 px-4 bg-gray-100 dark:bg-neutral-900 rounded-md min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6">
        {/* Sidebar */}
        <div className=" border h-96 md:h-[950px] border-gray-200 dark:border-neutral-800 rounded-lg   shadow-sm flex flex-col">
          <div className="p-4 border-b overflow-y-auto scrollbar-none border-gray-200 dark:border-neutral-800">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
              🐾 Pets
            </h2>
            <div className="mb-4 text-center ">
              <Input
                placeholder="Search your Pet"
                className="rounded-md bg-white dark:bg-neutral-900 focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-none"
                type="text"
              />
            </div>
            <div className="space-y-2">
              {mockPets.map((pet) => (
                <Card
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className={`transition-shadow hover:bg-slate-50 dark:hover:bg-neutral-700 border-2 `}
                >
                  <CardContent className="px-4 py-2 ">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={pet.avatar} alt={pet.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {pet.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {pet.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {pet.id}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-4 mt-auto">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
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
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={selectedPet.avatar}
                        alt={selectedPet.name}
                      />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                        {selectedPet.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedPet.name}
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {selectedPet.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="border-orange-200 dark:border-orange-400 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout
                    </Button>
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
