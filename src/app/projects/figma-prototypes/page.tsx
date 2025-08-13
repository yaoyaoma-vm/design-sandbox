'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Figma, Eye, Download, Share2, Heart } from 'lucide-react';
import { animateHero } from '@/lib/animations';

// Sample prototype data
const prototypes = [
  {
    id: 1,
    title: 'Mobile App Dashboard',
    description: 'Modern dashboard design for mobile applications',
    category: 'Mobile',
    likes: 24,
    views: 156,
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 2,
    title: 'E-commerce Checkout',
    description: 'Streamlined checkout process with payment integration',
    category: 'E-commerce',
    likes: 18,
    views: 89,
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 3,
    title: 'Social Media Feed',
    description: 'Dynamic social feed with engagement features',
    category: 'Social',
    likes: 32,
    views: 203,
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Data visualization and reporting interface',
    category: 'Analytics',
    likes: 15,
    views: 67,
    thumbnail: '/api/placeholder/400/300'
  }
];

export default function FigmaPrototypesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPrototypes, setLikedPrototypes] = useState<number[]>([]);

  useEffect(() => {
    animateHero();
  }, []);

  const categories = ['All', 'Mobile', 'E-commerce', 'Social', 'Analytics'];
  const filteredPrototypes = selectedCategory === 'All' 
    ? prototypes 
    : prototypes.filter(p => p.category === selectedCategory);

  const handleLike = (id: number) => {
    setLikedPrototypes(prev => 
      prev.includes(id) 
        ? prev.filter(likedId => likedId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sandbox
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="hero-content text-center space-y-8 mb-16">
            {/* Project Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Figma className="w-4 h-4" />
              Figma Prototypes
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Design Prototypes Gallery
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of interactive design prototypes and mockups
            </p>
          </div>

          {/* Category Filter */}
          <div className="hero-cta mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Prototypes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrototypes.map((prototype) => (
              <div 
                key={prototype.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img 
                    src={prototype.thumbnail} 
                    alt={prototype.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title and Category */}
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {prototype.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {prototype.category}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prototype.description}
                  </p>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {prototype.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {prototype.likes + (likedPrototypes.includes(prototype.id) ? 1 : 0)}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleLike(prototype.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        likedPrototypes.includes(prototype.id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${
                        likedPrototypes.includes(prototype.id) ? 'fill-current' : ''
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrototypes.length === 0 && (
            <div className="text-center py-12">
              <Figma className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No prototypes found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category or check back later for new designs.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
