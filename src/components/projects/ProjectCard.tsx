'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  thumbnail?: string;
}

export default function ProjectCard({ 
  id, 
  title, 
  description, 
  category, 
  createdAt, 
  thumbnail 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${id}`}>
      <div 
        className="group relative bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        {thumbnail && (
          <div className="w-full h-32 bg-muted rounded-md mb-4 overflow-hidden">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Arrow indicator */}
        <div className={`absolute top-4 right-4 transition-all duration-300 ${
          isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
        }`}>
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </div>
    </Link>
  );
}
