'use client';

import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import PlansList from '@/app/_components/plans-list';

export default function HomeContent() {
  const [openSheet, setOpenSheet] = useState(false);
  const queryStrings = useSearchParams();
  const form = queryStrings.get('form');

  return (
    <div className="home-parent dark py-10 px-20 text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
          Shey.Fit
        </h1>
        <Button
          variant="outline"
          className="border-border text-white hover:bg-white hover:text-black transition-colors"
          onClick={() => setOpenSheet(true)}
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
          onClick={() => {
            const plansDiv = document.getElementById('plans');
            plansDiv?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Plans
        </Button>

        <ArrowDownToLine
          size={24}
          className="animate-bounce cursor-pointer mt-16 text-muted-foreground hover:text-white transition-colors"
        />
      </div>
      <div id="plans">
        <h1 className="text-2xl font-bold text-center text-white mt-20">
          Our Plans
        </h1>
        <PlansList />
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="lg:min-w-[500px] flex items-center justify-center min-h-screen auth-parent">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          {form === 'sign-up' ? (
            <SignUp
              routing="hash"
              signInUrl="/?form=sign-in"
              fallbackRedirectUrl={'/account'}
            />
          ) : (
            <SignIn
              routing="hash"
              signUpUrl="/?form=sign-up"
              fallbackRedirectUrl={'/account'}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
