import { createContext, useContext, useState, ReactNode } from 'react';

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: number;
  title: string;
  skills: Skill[];
}

interface SkillsContextType {
  skillCategories: SkillCategory[];
  additionalTechnologies: string[];
  addSkillCategory: (category: Omit<SkillCategory, 'id'>) => void;
  updateSkillCategory: (id: number, category: Omit<SkillCategory, 'id'>) => void;
  deleteSkillCategory: (id: number) => void;
  updateAdditionalTechnologies: (technologies: string[]) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

const initialSkillCategories: SkillCategory[] = [
  {
    id: 1,
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
    ]
  },
  {
    id: 2,
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "Redis", level: 65 },
    ]
  },
  {
    id: 3,
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Figma", level: 85 },
      { name: "Vercel", level: 80 },
    ]
  }
];

const initialAdditionalTechnologies = [
  "GraphQL", "Socket.io", "Jest", "Cypress", "Webpack", "Vite", 
  "Prisma", "Express.js", "Flutter", "React Native", "Firebase", "Supabase"
];

export const SkillsProvider = ({ children }: { children: ReactNode }) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(initialSkillCategories);
  const [additionalTechnologies, setAdditionalTechnologies] = useState<string[]>(initialAdditionalTechnologies);

  const addSkillCategory = (category: Omit<SkillCategory, 'id'>) => {
    const newId = Math.max(...skillCategories.map(c => c.id), 0) + 1;
    setSkillCategories(prev => [...prev, { ...category, id: newId }]);
  };

  const updateSkillCategory = (id: number, updatedCategory: Omit<SkillCategory, 'id'>) => {
    setSkillCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...updatedCategory, id } : category
      )
    );
  };

  const deleteSkillCategory = (id: number) => {
    setSkillCategories(prev => prev.filter(category => category.id !== id));
  };

  const updateAdditionalTechnologies = (technologies: string[]) => {
    setAdditionalTechnologies(technologies);
  };

  return (
    <SkillsContext.Provider value={{
      skillCategories,
      additionalTechnologies,
      addSkillCategory,
      updateSkillCategory,
      deleteSkillCategory,
      updateAdditionalTechnologies
    }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};