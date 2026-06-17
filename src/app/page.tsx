'use client';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-parent dark py-10 px-20 text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
          Shey.Fit
        </h1>
        <Button
          variant="outline"
          className="border-border text-white hover:bg-white hover:text-black transition-colors"
        >
          Sign-in
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center h-[75vh] gap-7 mt-10">
        <h1 className="text-6xl font-extrabold text-center tracking-tight">
          <span className="text-white">Shey.</span>
          <span className="text-green-500">Fit</span>
        </h1>

        <p className="text-sm font-medium text-muted-foreground text-center max-w-md">
          A perfect gym for you to get fit and healthy with the best trainers
          and equipment.
        </p>

        <Button
          variant="outline"
          className="mt-2 border-border text-white hover:bg-white hover:text-black transition-colors"
        >
          Explore Plans
        </Button>

        <ArrowDownToLine
          size={24}
          className="animate-bounce cursor-pointer mt-16 text-muted-foreground hover:text-white transition-colors"
        />
      </div>
    </div>
  );
}
