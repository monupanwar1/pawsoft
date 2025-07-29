import { getAllPets } from '@/Action/actions'; // Import your server action
import PawSoftDashboard from '@/components/dashboard';
import { Pet } from '@/lib/types';


export default async function DashboardPage() {
  const pets: Pet[] = await getAllPets();
  return <PawSoftDashboard pets={pets} />;
}
