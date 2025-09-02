import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Extended project data with multiple images and detailed descriptions
const projectsData = {
  "dashboard-analytics": {
    id: 1,
    title: "Dashboard Analytics",
    description: "Platform analytics modern dengan visualisasi data real-time menggunakan React dan Chart.js. Fitur include custom dashboard, real-time notifications, dan export data.",
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
  "ecommerce-platform": {
    id: 2,
    title: "E-Commerce Platform",
    description: "Platform e-commerce lengkap dengan fitur cart, payment gateway, inventory management, dan admin dashboard. Dibangun dengan arsitektur microservices.",
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
  "task-management": {
    id: 3,
    title: "Task Management App",
    description: "Aplikasi manajemen tugas dengan fitur kolaborasi tim, real-time updates, file sharing, dan integrasi kalender. UI/UX yang clean dan intuitif.",
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
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">Project yang Anda cari tidak ditemukan.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Project Header */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/#projects">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            
            {/* Buttons temporarily hidden */}
            {/* <div className="flex gap-4">
              <Button 
                className="bg-hero-gradient hover:opacity-90 text-white"
                asChild
              >
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary/30 text-primary hover:bg-primary/10"
                asChild
              >
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Project Images Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Project Gallery
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-16">
              Screenshots dan detail fitur dari project ini
            </p>
            
            <div className="space-y-12">
              {project.images.map((image, index) => (
                <Card key={index} className="overflow-hidden bg-card-gradient border-border">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img 
                          src={image.url} 
                          alt={image.title}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4 text-foreground">
                          {image.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;