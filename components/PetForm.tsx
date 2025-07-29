'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

type FormData = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

export default function PetForm({ actionType }: PetFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    ownerName: '',
    imageUrl: '',
    age: 0,
    notes: '',
  });
  
  const handleAdd=()=>{
    setFormData(formData)
  }

  return (
    <form className="flex flex-col space-y-3">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" name="ownerName" value={formData.ownerName} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" value={formData.age} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} />
      </div>

      <button type="submit" className="bg-black text-white py-2 rounded">
        {actionType === 'add' ? 'Add Pet' : 'Edit Pet'}
      </button>
    </form>
  );
}
