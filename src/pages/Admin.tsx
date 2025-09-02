import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { toast } = useToast();
  
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    technologies: '',
    demoLink: '',
    githubLink: '',
    images: [{ url: '', title: '', description: '' }]
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      image: '',
      technologies: '',
      demoLink: '',
      githubLink: '',
      images: [{ url: '', title: '', description: '' }]
    });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      images: formData.images.filter(img => img.url && img.title)
    };

    addProject(newProject);
    toast({
      title: "Project Added",
      description: "Project baru berhasil ditambahkan!",
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      images: formData.images.filter(img => img.url && img.title)
    };

    updateProject(editingProject.id, updatedProject);
    toast({
      title: "Project Updated",
      description: "Project berhasil diupdate!",
    });
    setIsEditDialogOpen(false);
    setEditingProject(null);
    resetForm();
  };

  const handleDeleteProject = (id: number, title: string) => {
    if (window.confirm(`Yakin ingin menghapus project "${title}"?`)) {
      deleteProject(id);
      toast({
        title: "Project Deleted",
        description: "Project berhasil dihapus!",
      });
    }
  };

  const openEditDialog = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      demoLink: project.demoLink,
      githubLink: project.githubLink,
      images: project.images.length > 0 ? project.images : [{ url: '', title: '', description: '' }]
    });
    setIsEditDialogOpen(true);
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', title: '', description: '' }]
    }));
  };

  const updateImageField = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const ProjectForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Main Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="technologies">Technologies (comma separated)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
          placeholder="React, TypeScript, Node.js"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="demoLink">Demo Link</Label>
          <Input
            id="demoLink"
            value={formData.demoLink}
            onChange={(e) => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="githubLink">GitHub Link</Label>
          <Input
            id="githubLink"
            value={formData.githubLink}
            onChange={(e) => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Gallery Images</Label>
          <Button type="button" onClick={addImageField} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Image
          </Button>
        </div>
        
        {formData.images.map((image, index) => (
          <div key={index} className="border p-4 rounded-md mb-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Image {index + 1}</span>
              {formData.images.length > 1 && (
                <Button 
                  type="button" 
                  onClick={() => removeImageField(index)} 
                  size="sm" 
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Input
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => updateImageField(index, 'url', e.target.value)}
            />
            
            <Input
              placeholder="Image Title"
              value={image.title}
              onChange={(e) => updateImageField(index, 'title', e.target.value)}
            />
            
            <Textarea
              placeholder="Image Description"
              value={image.description}
              onChange={(e) => updateImageField(index, 'description', e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full bg-hero-gradient hover:opacity-90 text-white">
        {isEdit ? 'Update Project' : 'Add Project'}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Link to="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-hero-gradient bg-clip-text text-transparent">
                  Project Admin
                </span>
              </h1>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-hero-gradient hover:opacity-90 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                  </DialogHeader>
                  <ProjectForm onSubmit={handleAddProject} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-card-gradient border-border">
                  <CardHeader>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openEditDialog(project)}
                        className="flex-1"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteProject(project.id, project.title)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <ProjectForm onSubmit={handleEditProject} isEdit />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;