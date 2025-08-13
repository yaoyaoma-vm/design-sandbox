'use client';

import { useEffect } from 'react';
import { animateHero } from '@/lib/animations';

export default function HomePage() {
  useEffect(() => {
    animateHero();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <div className="hero-content space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Design Sandbox
            </h1>
            <p className="text-xl text-muted-foreground">
              Your AI-powered playground for rapid prototyping
            </p>
            <div className="hero-cta">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold">
                Create New Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
