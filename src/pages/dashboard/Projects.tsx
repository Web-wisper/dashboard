import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Grid3X3,
  List,
  MoreVertical,
  Globe,
  Calendar,
  ExternalLink,
  Pencil,
  Trash2,
  Check,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import NewProjectModal from '@/components/dashboard/NewProjectModal';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  lastEdited: string;
  status: 'published' | 'draft';
}

const dummyProjects: Project[] = [
  { id: '1', name: 'Portfolio Website', url: 'portfolio.webwhisper.io', lastEdited: '2 hours ago', status: 'published' },
  { id: '2', name: 'E-commerce Store', url: 'store.webwhisper.io', lastEdited: '1 day ago', status: 'published' },
  { id: '3', name: 'Agency Landing Page', url: 'agency.webwhisper.io', lastEdited: '3 days ago', status: 'draft' },
  { id: '4', name: 'Blog Platform', url: 'blog.webwhisper.io', lastEdited: '1 week ago', status: 'draft' },
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleCreateProject = (newProject: { name: string; description: string; template: string }) => {
    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      url: `${newProject.name.toLowerCase().replace(/\s+/g, '-')}.webwhisper.io`,
      lastEdited: 'Just now',
      status: 'draft',
    };
    setProjects(prev => [project, ...prev]);
    toast.success(`${newProject.name} created successfully`);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleUpdateProject = (updatedProject: { name: string; description: string; template: string }) => {
    if (editingProject) {
      setProjects(prev => prev.map(p =>
        p.id === editingProject.id
          ? { ...p, name: updatedProject.name, lastEdited: 'Just now' }
          : p
      ));
      setEditingProject(null);
      toast.success(`${updatedProject.name} updated successfully`);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    toast.success(`${project?.name} deleted successfully`);
  };

  const handleViewSite = (url: string) => {
    window.open(`https://${url}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-h2-mobile md:text-h2 font-heading mb-1">Projects</h1>
          <p className="text-opacity-50 text-body-sm">Manage and organize your websites</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-md transition-colors duration-150",
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-opacity-50 hover:text-foreground'
              )}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-md transition-colors duration-150",
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-opacity-50 hover:text-foreground'
              )}
            >
              <List size={18} />
            </button>
          </div>
          <Button
            className="btn-gradient h-10 px-4 gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <Globe className="w-16 h-16 mx-auto text-opacity-30 mb-4" />
          <h3 className="text-h3 font-heading mb-2">No projects yet</h3>
          <p className="text-opacity-50 text-body-sm mb-6">
            Create your first website to get started
          </p>
          <Button
            className="btn-gradient h-12 px-6 gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            Create Project
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden group stagger-fade-in hover:border-primary/50 transition-colors duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-opacity-30" />
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-muted focus:bg-muted"
                        onClick={() => handleViewSite(project.url)}
                      >
                        <ExternalLink size={14} className="mr-2" /> View Site
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-muted focus:bg-muted"
                        onClick={() => handleEditProject(project)}
                      >
                        <Pencil size={14} className="mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-label font-medium">{project.name}</h3>
                  <span className={cn(
                    "text-label-sm px-2 py-0.5 rounded-full",
                    project.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  )}>
                    {project.status}
                  </span>
                </div>
                <p className="text-label-sm text-opacity-50 mb-2">{project.url}</p>
                <div className="flex items-center gap-1 text-opacity-30 text-label-sm">
                  <Calendar size={12} />
                  {project.lastEdited}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden animate-fade-in">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-label-sm text-opacity-50 font-medium p-4">Name</th>
                <th className="text-left text-label-sm text-opacity-50 font-medium p-4 hidden md:table-cell">URL</th>
                <th className="text-left text-label-sm text-opacity-50 font-medium p-4 hidden sm:table-cell">Status</th>
                <th className="text-left text-label-sm text-opacity-50 font-medium p-4 hidden lg:table-cell">Last Edited</th>
                <th className="text-right text-label-sm text-opacity-50 font-medium p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors stagger-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Globe size={18} className="text-primary" />
                      </div>
                      <span className="text-label font-medium">{project.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-body-sm text-opacity-50 hidden md:table-cell">{project.url}</td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className={cn(
                      "text-label-sm px-2 py-0.5 rounded-full",
                      project.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    )}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 text-body-sm text-opacity-30 hidden lg:table-cell">{project.lastEdited}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-muted focus:bg-muted"
                          onClick={() => handleViewSite(project.url)}
                        >
                          <ExternalLink size={14} className="mr-2" /> View Site
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-muted focus:bg-muted"
                          onClick={() => handleEditProject(project)}
                        >
                          <Pencil size={14} className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 size={14} className="mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewProjectModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingProject(null);
        }}
        onCreateProject={editingProject ? handleUpdateProject : handleCreateProject}
        editingProject={editingProject}
      />
    </div>
  );
};

export default Projects;
