import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
  images: {
    url: string;
    title: string;
    description: string;
  }[];
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  getProjectBySlug: (slug: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Initial data
const initialProjects: Project[] = [
  {
    id: 1,
    slug: "dashboard-analytics",
    title: "Dashboard Analytics",
    description: "Platform analytics modern dengan visualisasi data real-time menggunakan React dan Chart.js. Fitur include custom dashboard, real-time notifications, dan export data.",
    image: "/src/assets/project-1.jpg",
    technologies: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Node.js"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/dashboard",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        title: "Dashboard Utama",
        description: "Interface utama dashboard dengan widget analytics real-time dan grafik interaktif"
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        title: "Data Visualization",
        description: "Berbagai jenis chart dan grafik untuk visualisasi data yang comprehensive"
      },
      {
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        title: "Settings & Configuration",
        description: "Panel konfigurasi untuk customize dashboard sesuai kebutuhan user"
      }
    ]
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Platform e-commerce lengkap dengan fitur cart, payment gateway, inventory management, dan admin dashboard. Dibangun dengan arsitektur microservices.",
    image: "/src/assets/project-2.jpg",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Redis"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/ecommerce",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        title: "Homepage & Product Catalog",
        description: "Halaman utama dengan product showcase dan sistem pencarian yang powerful"
      },
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        title: "Shopping Cart & Checkout",
        description: "Proses checkout yang smooth dengan integrasi multiple payment gateway"
      },
      {
        url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop",
        title: "Admin Dashboard",
        description: "Panel admin untuk manage products, orders, dan analytics penjualan"
      }
    ]
  },
  {
    id: 3,
    slug: "task-management",
    title: "Task Management App",
    description: "Aplikasi manajemen tugas dengan fitur kolaborasi tim, real-time updates, file sharing, dan integrasi kalender. UI/UX yang clean dan intuitif.",
    image: "/src/assets/project-3.jpg",
    technologies: ["React Native", "Firebase", "Redux", "Socket.io"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/taskapp",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        title: "Task Board & Kanban",
        description: "Interface kanban board untuk organize tasks dengan drag & drop functionality"
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        title: "Team Collaboration",
        description: "Fitur kolaborasi tim dengan real-time chat dan file sharing"
      },
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        title: "Calendar Integration",
        description: "Integrasi kalender untuk tracking deadline dan scheduling meetings"
      }
    ]
  }
];

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    const newProject = { ...project, id: newId };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: number, updatedProject: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    ));
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find(project => project.slug === slug);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      getProjectBySlug
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};