'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PetEssentials } from '@/lib/types';
import { FormEvent } from 'react';

type PetFormProps = {
  formData: PetEssentials;
  onChange: <T extends keyof PetEssentials>(
    name: T,
    value: PetEssentials[T],
  ) => void;
  actionType: 'add' | 'edit' | 'delete';
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function PetForm({
  formData,
  onChange,
  actionType,
  onSubmit,
}: PetFormProps) {
  if (actionType === 'delete') return null;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          name="ownerName"
          value={formData.ownerName}
          onChange={(e) => onChange('ownerName', e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => onChange('imageUrl', e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          name="age"
          type="number"
          value={formData.age}
          onChange={(e) => onChange('age', Number(e.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          name="notes"
          value={formData.notes ?? ''}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" variant="default">
          {actionType === 'edit' ? 'Update' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
