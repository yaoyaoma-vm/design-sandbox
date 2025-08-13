'use client';

import { useState } from 'react';
import { Plus, Loader2, Check, AlertCircle } from 'lucide-react';

interface AddFigmaPrototypeProps {
  onAdd: (prototype: {
    id: string;
    title: string;
    description: string;
    category: string;
    figmaUrl: string;
    thumbnail?: string;
    likes: number;
    views: number;
    createdAt: string;
  }) => void;
}

export default function AddFigmaPrototype({ onAdd }: AddFigmaPrototypeProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['Design', 'Mobile', 'Web', 'Dashboard', 'E-commerce', 'Social', 'Analytics', 'Other'];

  const extractFigmaInfo = (figmaUrl: string) => {
    // Extract file name from Figma URL
    const match = figmaUrl.match(/figma\.com\/file\/([^\/]+)\/([^\/\?]+)/);
    if (match) {
      const fileId = match[1];
      const fileName = decodeURIComponent(match[2].replace(/-/g, ' '));
      return { fileId, fileName };
    }
    return null;
  };

  const getFigmaThumbnail = async (fileId: string) => {
    try {
      // Figma doesn't provide direct thumbnail API without authentication
      // For now, we'll use a placeholder or you can implement Figma API integration
      return `https://via.placeholder.com/400x300/6366f1/ffffff?text=Figma+Prototype`;
    } catch (error) {
      console.error('Error fetching Figma thumbnail:', error);
      return undefined;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a Figma URL');
      return;
    }

    if (!url.includes('figma.com/file/')) {
      setError('Please enter a valid Figma file URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const figmaInfo = extractFigmaInfo(url);
      if (!figmaInfo) {
        throw new Error('Invalid Figma URL format');
      }

      const thumbnail = await getFigmaThumbnail(figmaInfo.fileId);
      
      const prototype = {
        id: Date.now().toString(),
        title: title.trim() || figmaInfo.fileName,
        description: description.trim() || 'Figma prototype design',
        category,
        figmaUrl: url.trim(),
        thumbnail,
        likes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
      };

      onAdd(prototype);
      
      // Reset form
      setUrl('');
      setTitle('');
      setDescription('');
      setCategory('Design');
      setIsExpanded(false);
      
    } catch (error) {
      setError('Failed to add prototype. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = async () => {
    if (!url.trim()) {
      setError('Please enter a Figma URL');
      return;
    }

    if (!url.includes('figma.com/file/')) {
      setError('Please enter a valid Figma file URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const figmaInfo = extractFigmaInfo(url);
      if (!figmaInfo) {
        throw new Error('Invalid Figma URL format');
      }

      const thumbnail = await getFigmaThumbnail(figmaInfo.fileId);
      
      const prototype = {
        id: Date.now().toString(),
        title: figmaInfo.fileName,
        description: 'Figma prototype design',
        category: 'Design',
        figmaUrl: url.trim(),
        thumbnail,
        likes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
      };

      onAdd(prototype);
      setUrl('');
      
    } catch (error) {
      setError('Failed to add prototype. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Add Figma Prototype</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input */}
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Figma prototype URL here..."
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isLoading || !url.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Quick Add
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Expand for more options */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} advanced options
        </button>

        {/* Advanced Options */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Custom title (optional)"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the prototype..."
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Add Prototype
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
