import { Badge } from '@/components/ui/badge';
import { CardCarousel } from '@/components/ui/card-carousel';
import WrapButton from '@/components/ui/wrap-button';
import { Globe, Sparkles } from 'lucide-react';



const images = [
  { src: '/image1.png', alt: 'Image 1' },
  { src: '/image2.png', alt: 'Image 2' },
  { src: '/image3.png', alt: 'Image 3' },
];

export default function Page() {
  return (
    <main className=" pt-16 flex flex-col justify-center items-center min-h-screen">
      <section className="flex flex-col items-center text-center py-16">
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md shadow-md flex items-center gap-2 px-3 py-1 text-sm font-medium">
          <Sparkles className="text-lg" />
          PetCare
        </Badge>

        <h1 className="font-extrabold mt-6 text-5xl sm:text-6xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">
          PawSoft
        </h1>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Manage your pet with ease.
        </p>
      </section>

      <section className="w-full container px-2 md:px-4 lg:px-6 flex items-center justify-center flex-col">
        <div className="w-full max-w-7xl pt-2 ">
          <CardCarousel
            images={images}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
        <div className="w-full flex items-center justify-center ">
          <WrapButton className="mt-10" href="/dashboard">
            <Globe className="animate-spin " />
            Get started
          </WrapButton>
        </div>
      </section>
    </main>
  );
}
