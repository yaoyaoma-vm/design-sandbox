import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  thumbnail?: string;
}

interface ProjectMetadata {
  title?: string;
  description?: string;
  category?: string;
  createdAt?: string;
  thumbnail?: string;
  tags?: string[];
  author?: string;
  version?: string;
}

export function getProjects(): Project[] {
  try {
    const projectsDir = path.join(process.cwd(), 'src/app/projects');
    
    // Check if projects directory exists
    if (!fs.existsSync(projectsDir)) {
      return [];
    }

    const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    return projectFolders.map(folder => {
      // Convert folder name to title (e.g., "sign-up-flow" -> "Sign Up Flow")
      const title = folder
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Generate description based on folder name
      const descriptions: Record<string, string> = {};

      // Generate category based on folder name
      const categories: Record<string, string> = {};

      // Check if project has a metadata file
      const metadataPath = path.join(projectsDir, folder, 'project.json');
      let metadata: ProjectMetadata = {};
      
      if (fs.existsSync(metadataPath)) {
        try {
          metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        } catch (error) {
          console.warn(`Error reading metadata for ${folder}:`, error);
        }
      }

      // Get creation date from folder stats
      const folderPath = path.join(projectsDir, folder);
      const stats = fs.statSync(folderPath);
      const createdAt = stats.birthtime.toISOString().split('T')[0];

      return {
        id: folder,
        title: metadata.title || title,
        description: metadata.description || descriptions[folder] || `A ${title.toLowerCase()} project.`,
        category: metadata.category || categories[folder] || 'General',
        createdAt: metadata.createdAt || createdAt,
        thumbnail: metadata.thumbnail || `/api/placeholder/400/200`,
        ...metadata
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by creation date, newest first

  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}
