// PetButton.tsx
'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './PetForm';
import { PetEssentials, Pet } from '@/lib/types';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'delete';
  children: React.ReactNode;
  pet?: Pet;
  onDelete?: () => void;
  onSubmit?: (data: PetEssentials) => void;
};

export default function PetButton({
  actionType,
  children,
  pet,
  onDelete,
  onSubmit,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<PetEssentials>({
    name: pet?.name || '',
    ownerName: pet?.ownerName || '',
    imageUrl: pet?.imageUrl || '',
    age: pet?.age || 0,
    notes: pet?.notes || '',
  });

  const handleChange = <T extends keyof PetEssentials>(
    name: T,
    value: PetEssentials[T],
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) await onSubmit(formData);
    setIsFormOpen(false);
  };

  if (actionType === 'delete') {
    return (
      <Button variant="destructive" onClick={onDelete}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
          actionType={actionType}
        />
      </DialogContent>
    </Dialog>
  );
}
