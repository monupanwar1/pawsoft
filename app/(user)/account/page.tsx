'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser, SignOutButton } from '@clerk/nextjs';

export default function AccountPage() {
  const { user } = useUser();

  if (!user) return null; 

  return (
    <main>
      <section className="container flex justify-center min-h-screen py-14 md:py-20">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20 border-2 border-blue-500 bg-gray-700">
            <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <h1 className="font-bold text-4xl md:text-5xl mt-4">
            Welcome back, {user.firstName || 'User'}!
          </h1>

          <SignOutButton>
            <Button className="px-12 py-4 mt-10" variant="destructive">
              Logout
            </Button>
          </SignOutButton>
        </div>
      </section>
    </main>
  );
}
