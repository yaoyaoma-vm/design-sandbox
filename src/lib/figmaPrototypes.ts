export interface FigmaPrototype {
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

const STORAGE_KEY = 'figma-prototypes';
const LIKED_PROTOTYPES_KEY = 'liked-figma-prototypes';

export class FigmaPrototypeManager {
  static getPrototypes(): FigmaPrototype[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading prototypes:', error);
      return [];
    }
  }

  static savePrototypes(prototypes: FigmaPrototype[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prototypes));
    } catch (error) {
      console.error('Error saving prototypes:', error);
    }
  }

  static addPrototype(prototype: FigmaPrototype): void {
    const prototypes = this.getPrototypes();
    prototypes.unshift(prototype); // Add to beginning
    this.savePrototypes(prototypes);
  }

  static removePrototype(id: string): void {
    const prototypes = this.getPrototypes();
    const filtered = prototypes.filter(p => p.id !== id);
    this.savePrototypes(filtered);
  }

  static updatePrototype(id: string, updates: Partial<FigmaPrototype>): void {
    const prototypes = this.getPrototypes();
    const index = prototypes.findIndex(p => p.id === id);
    if (index !== -1) {
      prototypes[index] = { ...prototypes[index], ...updates };
      this.savePrototypes(prototypes);
    }
  }

  static getLikedPrototypes(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(LIKED_PROTOTYPES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading liked prototypes:', error);
      return [];
    }
  }

  static toggleLike(prototypeId: string): boolean {
    const liked = this.getLikedPrototypes();
    const isLiked = liked.includes(prototypeId);
    
    if (isLiked) {
      const newLiked = liked.filter(id => id !== prototypeId);
      localStorage.setItem(LIKED_PROTOTYPES_KEY, JSON.stringify(newLiked));
      return false;
    } else {
      const newLiked = [...liked, prototypeId];
      localStorage.setItem(LIKED_PROTOTYPES_KEY, JSON.stringify(newLiked));
      return true;
    }
  }

  static isLiked(prototypeId: string): boolean {
    const liked = this.getLikedPrototypes();
    return liked.includes(prototypeId);
  }

  static incrementViews(prototypeId: string): void {
    const prototypes = this.getPrototypes();
    const index = prototypes.findIndex(p => p.id === prototypeId);
    if (index !== -1) {
      prototypes[index].views += 1;
      this.savePrototypes(prototypes);
    }
  }

  static getCategories(): string[] {
    const prototypes = this.getPrototypes();
    const categories = prototypes.map(p => p.category);
    return [...new Set(categories)].sort();
  }

  static filterByCategory(category: string): FigmaPrototype[] {
    const prototypes = this.getPrototypes();
    if (category === 'All') return prototypes;
    return prototypes.filter(p => p.category === category);
  }

  static searchPrototypes(query: string): FigmaPrototype[] {
    const prototypes = this.getPrototypes();
    const lowercaseQuery = query.toLowerCase();
    return prototypes.filter(p => 
      p.title.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Figma URL utilities
export const FigmaUtils = {
  isValidFigmaUrl(url: string): boolean {
    return url.includes('figma.com/file/');
  },

  extractFigmaInfo(url: string): { fileId: string; fileName: string } | null {
    const match = url.match(/figma\.com\/file\/([^\/]+)\/([^\/\?]+)/);
    if (match) {
      const fileId = match[1];
      const fileName = decodeURIComponent(match[2].replace(/-/g, ' '));
      return { fileId, fileName };
    }
    return null;
  },

  async getFigmaThumbnail(fileId: string): Promise<string | undefined> {
    try {
      // For now, return a placeholder
      // In the future, you could implement Figma API integration
      return `https://via.placeholder.com/400x300/6366f1/ffffff?text=Figma+Prototype`;
    } catch (error) {
      console.error('Error fetching Figma thumbnail:', error);
      return undefined;
    }
  }
};
