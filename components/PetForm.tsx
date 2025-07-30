import { PetEssentials } from '@/lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type PetFormProps = {
  formData: PetEssentials;
  onChange: <T extends keyof PetEssentials>(
    field: T,
    value: PetEssentials[T],
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  actionType: 'add' | 'edit';
};

export default function PetForm({
  formData,
  onChange,
  onSubmit,
  actionType,
}: PetFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Pet name</label>
        <Input
          placeholder="Pet name"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Owner name</label>
        <Input
          placeholder="Owner name"
          value={formData.ownerName}
          onChange={(e) => onChange('ownerName', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Image URL</label>
        <Input
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => onChange('imageUrl', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Age</label>
        <Input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => onChange('age', Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Notes</label>
        <Textarea
          placeholder="Notes"
          value={formData.notes ?? ''}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </div>

      <Button type="submit">
        {actionType === 'add' ? 'Add Pet' : 'Update Pet'}
      </Button>
    </form>
  );
}
