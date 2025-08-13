'use client';

import { useEffect } from 'react';
import { animateHero, animateProjectCard } from '@/lib/animations';
import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/lib/projects';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  useEffect(() => {
    animateHero();
    animateProjectCard('.project-card');
  }, []);

  return (
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
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-muted-foreground">
              Create your first project to get started.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
