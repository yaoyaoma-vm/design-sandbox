'use client';

import { useState } from 'react';
import Image from "next/image";
import { Eye, Download, Share2, Heart, X, ExternalLink } from 'lucide-react';

interface FigmaPrototype {
  id: string;
  title: string;
  description: string;
  category: string;
  figmaUrl: string;
  thumbnail?: string;
  likes: number;
  views: number;
  createdAt: string;
}

interface FigmaPrototypeCardProps {
  prototype: FigmaPrototype;
  onRemove: (id: string) => void;
  onLike: (id: string) => void;
  isLiked: boolean;
}

export default function FigmaPrototypeCard({ 
  prototype, 
  onRemove, 
  onLike, 
  isLiked 
}: FigmaPrototypeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenFigma = () => {
    window.open(prototype.figmaUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prototype.title,
          text: prototype.description,
          url: prototype.figmaUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(prototype.figmaUrl);
    }
  };

  return (
    <div 
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Remove Button */}
      <button
        onClick={() => onRemove(prototype.id)}
        className="absolute top-2 right-2 z-10 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
        title="Remove prototype"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden cursor-pointer" onClick={handleOpenFigma}>
        {prototype.thumbnail ? (
          <Image 
            src={prototype.thumbnail} 
            alt={prototype.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ExternalLink className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 font-medium">Figma Prototype</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleOpenFigma();
              }}
              className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
              title="Open in Figma"
            >
              <ExternalLink className="w-4 h-4 text-gray-700" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Category */}
        <div>
          <h3 
            className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer"
            onClick={handleOpenFigma}
          >
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
              {prototype.likes + (isLiked ? 1 : 0)}
            </span>
          </div>
          
          <button
            onClick={() => onLike(prototype.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isLiked
                ? 'text-red-500 bg-red-50'
                : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${
              isLiked ? 'fill-current' : ''
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}
