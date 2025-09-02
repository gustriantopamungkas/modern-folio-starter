import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectBySlug } = useProjects();
  const project = projectId ? getProjectBySlug(projectId) : null;

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
              {project.images && project.images.length > 0 ? (
                project.images.map((image, index) => (
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
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No gallery images available for this project.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;