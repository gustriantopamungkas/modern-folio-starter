import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, ArrowLeft, Minus } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { useSkills, Skill, SkillCategory } from '@/contexts/SkillsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { skillCategories, additionalTechnologies, addSkillCategory, updateSkillCategory, deleteSkillCategory, updateAdditionalTechnologies } = useSkills();
  const { toast } = useToast();
  
  // Project states
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Skills states
  const [editingSkillCategory, setEditingSkillCategory] = useState<SkillCategory | null>(null);
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
  const [isEditSkillDialogOpen, setIsEditSkillDialogOpen] = useState(false);
  const [isEditTechDialogOpen, setIsEditTechDialogOpen] = useState(false);

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

  const [skillFormData, setSkillFormData] = useState({
    title: '',
    skills: [{ name: '', level: 50 }]
  });

  const [techFormData, setTechFormData] = useState({
    technologies: ''
  });

  // Initialize tech form data with current additional technologies
  useEffect(() => {
    setTechFormData({ technologies: additionalTechnologies.join(', ') });
  }, [additionalTechnologies]);

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

  const resetSkillForm = () => {
    setSkillFormData({
      title: '',
      skills: [{ name: '', level: 50 }]
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

  // Skills handlers
  const handleAddSkillCategory = (e: React.FormEvent) => {
    e.preventDefault();
    addSkillCategory({
      title: skillFormData.title,
      skills: skillFormData.skills.filter(skill => skill.name.trim() !== '')
    });
    toast({
      title: "Skill Category Added",
      description: "Kategori skill baru berhasil ditambahkan!",
    });
    setIsAddSkillDialogOpen(false);
    resetSkillForm();
  };

  const handleEditSkillCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkillCategory) {
      updateSkillCategory(editingSkillCategory.id, {
        title: skillFormData.title,
        skills: skillFormData.skills.filter(skill => skill.name.trim() !== '')
      });
      toast({
        title: "Skill Category Updated",
        description: "Kategori skill berhasil diupdate!",
      });
      setIsEditSkillDialogOpen(false);
      setEditingSkillCategory(null);
      resetSkillForm();
    }
  };

  const handleDeleteSkillCategory = (id: number, title: string) => {
    if (window.confirm(`Yakin ingin menghapus kategori "${title}"?`)) {
      deleteSkillCategory(id);
      toast({
        title: "Skill Category Deleted",
        description: "Kategori skill berhasil dihapus!",
      });
    }
  };

  const openEditSkillDialog = (category: SkillCategory) => {
    setEditingSkillCategory(category);
    setSkillFormData({
      title: category.title,
      skills: category.skills.length > 0 ? category.skills : [{ name: '', level: 50 }]
    });
    setIsEditSkillDialogOpen(true);
  };

  const addSkillField = () => {
    setSkillFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 50 }]
    }));
  };

  const updateSkillField = (index: number, field: 'name' | 'level', value: string | number) => {
    setSkillFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkillField = (index: number) => {
    setSkillFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateTechnologies = (e: React.FormEvent) => {
    e.preventDefault();
    const technologies = techFormData.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');
    updateAdditionalTechnologies(technologies);
    toast({
      title: "Technologies Updated",
      description: "Teknologi tambahan berhasil diupdate!",
    });
    setIsEditTechDialogOpen(false);
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

  const SkillForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="skillTitle">Category Title</Label>
        <Input
          id="skillTitle"
          value={skillFormData.title}
          onChange={(e) => setSkillFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Skills</Label>
          <Button type="button" onClick={addSkillField} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Skill
          </Button>
        </div>
        
        {skillFormData.skills.map((skill, index) => (
          <div key={index} className="border p-4 rounded-md mb-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Skill {index + 1}</span>
              {skillFormData.skills.length > 1 && (
                <Button 
                  type="button" 
                  onClick={() => removeSkillField(index)} 
                  size="sm" 
                  variant="destructive"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Input
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => updateSkillField(index, 'name', e.target.value)}
            />
            
            <div>
              <Label>Level: {skill.level}%</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) => updateSkillField(index, 'level', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full bg-hero-gradient hover:opacity-90 text-white">
        {isEdit ? 'Update Category' : 'Add Category'}
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

            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Admin Panel
              </span>
            </h1>

            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Manage Projects</h2>
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
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Manage Skills</h2>
                  <div className="flex gap-2">
                    <Dialog open={isEditTechDialogOpen} onOpenChange={setIsEditTechDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Technologies
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Additional Technologies</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdateTechnologies} className="space-y-4">
                          <div>
                            <Label htmlFor="technologies">Technologies (comma separated)</Label>
                            <Textarea
                              id="technologies"
                              value={techFormData.technologies}
                              onChange={(e) => setTechFormData({ technologies: e.target.value })}
                              placeholder="GraphQL, Socket.io, Jest..."
                              rows={4}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-hero-gradient hover:opacity-90 text-white">
                            Update Technologies
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog open={isAddSkillDialogOpen} onOpenChange={setIsAddSkillDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-hero-gradient hover:opacity-90 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Skill Category
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Add New Skill Category</DialogTitle>
                        </DialogHeader>
                        <SkillForm onSubmit={handleAddSkillCategory} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillCategories.map((category) => (
                    <Card key={category.id} className="bg-card-gradient border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          {category.skills.slice(0, 3).map((skill) => (
                            <div key={skill.name} className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                          ))}
                          {category.skills.length > 3 && (
                            <div className="text-sm text-muted-foreground">
                              +{category.skills.length - 3} more skills
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => openEditSkillDialog(category)}
                            className="flex-1"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteSkillCategory(category.id, category.title)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Edit Project Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <ProjectForm onSubmit={handleEditProject} isEdit />
              </DialogContent>
            </Dialog>

            {/* Edit Skill Category Dialog */}
            <Dialog open={isEditSkillDialogOpen} onOpenChange={setIsEditSkillDialogOpen}>
              <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Skill Category</DialogTitle>
                </DialogHeader>
                <SkillForm onSubmit={handleEditSkillCategory} isEdit />
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