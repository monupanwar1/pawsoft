import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="container px-4 min-h-screen flex items-center justify-center py-40">
      <SignUp />
    </section>
  );
}
