'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Figma, Search, Filter } from 'lucide-react';
import { animateHero } from '@/lib/animations';
import { FigmaPrototypeManager, FigmaPrototype } from '@/lib/figmaPrototypes';
import FigmaPrototypeCard from '@/components/projects/FigmaPrototypeCard';
import AddFigmaPrototype from '@/components/projects/AddFigmaPrototype';

export default function FigmaPrototypesPage() {
  const [prototypes, setPrototypes] = useState<FigmaPrototype[]>([]);
  const [filteredPrototypes, setFilteredPrototypes] = useState<FigmaPrototype[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPrototypes, setLikedPrototypes] = useState<string[]>([]);

  useEffect(() => {
    animateHero();
    loadPrototypes();
    loadLikedPrototypes();
  }, []);

  useEffect(() => {
    filterPrototypes();
  }, [prototypes, selectedCategory, searchQuery]);

  const loadPrototypes = () => {
    const loaded = FigmaPrototypeManager.getPrototypes();
    setPrototypes(loaded);
  };

  const loadLikedPrototypes = () => {
    const liked = FigmaPrototypeManager.getLikedPrototypes();
    setLikedPrototypes(liked);
  };

  const filterPrototypes = () => {
    let filtered = prototypes;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    setFilteredPrototypes(filtered);
  };

  const handleAddPrototype = (prototype: FigmaPrototype) => {
    FigmaPrototypeManager.addPrototype(prototype);
    loadPrototypes();
  };

  const handleRemovePrototype = (id: string) => {
    FigmaPrototypeManager.removePrototype(id);
    loadPrototypes();
  };

  const handleLike = (id: string) => {
    const isLiked = FigmaPrototypeManager.toggleLike(id);
    loadLikedPrototypes();
    
    // Update the prototype's like count
    const prototype = prototypes.find(p => p.id === id);
    if (prototype) {
      const newLikes = isLiked ? prototype.likes + 1 : prototype.likes - 1;
      FigmaPrototypeManager.updatePrototype(id, { likes: newLikes });
      loadPrototypes();
    }
  };

  const handleView = (id: string) => {
    FigmaPrototypeManager.incrementViews(id);
    loadPrototypes();
  };

  const categories = ['All', ...FigmaPrototypeManager.getCategories()];

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
              Manage and organize your Figma prototypes in one place
            </p>
          </div>

          {/* Add Prototype Form */}
          <AddFigmaPrototype onAdd={handleAddPrototype} />

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prototypes..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Filter className="w-3 h-3" />
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredPrototypes.length} prototype{filteredPrototypes.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Prototypes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrototypes.map((prototype) => (
              <FigmaPrototypeCard
                key={prototype.id}
                prototype={prototype}
                onRemove={handleRemovePrototype}
                onLike={handleLike}
                isLiked={likedPrototypes.includes(prototype.id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredPrototypes.length === 0 && (
            <div className="text-center py-12">
              <Figma className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {prototypes.length === 0 ? 'No prototypes yet' : 'No prototypes found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {prototypes.length === 0 
                  ? 'Add your first Figma prototype to get started!'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
              {prototypes.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  <p>Paste a Figma URL above to add your first prototype</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
