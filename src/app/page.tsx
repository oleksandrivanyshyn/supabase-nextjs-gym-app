import { Suspense } from 'react';
import HomeContent from './_components/home-content';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
