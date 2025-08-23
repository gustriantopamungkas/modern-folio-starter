import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const projects = [
  {
    id: 1,
    title: "Dashboard Analytics",
    description: "Platform analytics modern dengan visualisasi data real-time menggunakan React dan Chart.js. Fitur include custom dashboard, real-time notifications, dan export data.",
    image: project1,
    technologies: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Node.js"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/dashboard"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Platform e-commerce lengkap dengan fitur cart, payment gateway, inventory management, dan admin dashboard. Dibangun dengan arsitektur microservices.",
    image: project2,
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Redis"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/ecommerce"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Aplikasi manajemen tugas dengan fitur kolaborasi tim, real-time updates, file sharing, dan integrasi kalender. UI/UX yang clean dan intuitif.",
    image: project3,
    technologies: ["React Native", "Firebase", "Redux", "Socket.io"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/taskapp"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Projek Saya
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Beberapa projek yang telah saya kerjakan dengan passion dan dedikasi
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden bg-card-gradient border-border hover:shadow-accent-glow transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-hero-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      className="bg-hero-gradient hover:opacity-90 text-white flex-1"
                      asChild
                    >
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-primary/30 text-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;