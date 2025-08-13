'use client';

import { useEffect } from 'react';
import { animateHero, animateProjectCard } from '@/lib/animations';
import ProjectCard from '@/components/projects/ProjectCard';

// Sample projects data
const projects = [
  {
    id: 'sign-up-flow',
    title: 'Sign Up Flow',
    description: 'A modern authentication flow with form validation and smooth transitions.',
    category: 'Authentication',
    createdAt: '2024-01-15',
    thumbnail: '/api/placeholder/400/200'
  },
  {
    id: 'nps-question',
    title: 'NPS Question',
    description: 'Interactive Net Promoter Score component with animated feedback.',
    category: 'Feedback',
    createdAt: '2024-01-14',
    thumbnail: '/api/placeholder/400/200'
  }
];

export default function HomePage() {
  useEffect(() => {
    animateHero();
    animateProjectCard('.project-card');
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
              <p className="text-sm text-muted-foreground">
                Click on any project below to explore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All your prototypes and experiments in one place. Click any project to view and interact.
            </p>
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
