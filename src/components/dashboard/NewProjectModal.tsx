import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe, Loader2, Plus } from 'lucide-react';

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: { name: string; description: string; template: string }) => void;
  editingProject?: Project | null;
}

interface Project {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  lastEdited: string;
  status: 'published' | 'draft';
}

const templates = [
  { id: 'blank', name: 'Blank Project', description: 'Start from scratch' },
  { id: 'portfolio', name: 'Portfolio', description: 'Personal portfolio website' },
  { id: 'business', name: 'Business', description: 'Professional business site' },
  { id: 'blog', name: 'Blog', description: 'Content-focused blog' },
];

const NewProjectModal = ({ open, onOpenChange, onCreateProject, editingProject }: NewProjectModalProps) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [isCreating, setIsCreating] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingProject) {
      setProjectName(editingProject.name);
      setDescription('');
      setSelectedTemplate('blank');
    } else {
      setProjectName('');
      setDescription('');
      setSelectedTemplate('blank');
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onCreateProject({
      name: projectName,
      description,
      template: selectedTemplate,
    });
    
    setIsCreating(false);
    setProjectName('');
    setDescription('');
    setSelectedTemplate('blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 rounded-lg sm:rounded-xl md:rounded-2xl glass-card border-primary/20 shadow-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-h4-mobile sm:text-h3 font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
          <DialogDescription className="text-opacity-50 text-body-sm">
            Set up your new website project with a template
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-label">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Website"
              className="h-10 sm:h-12 bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary focus:bg-input transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-label">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your project..."
              className="min-h-[60px] sm:min-h-[80px] bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary focus:bg-input resize-none transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-label">Choose Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="h-10 sm:h-12 bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-200">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-opacity-50">{template.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-border/30 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 sm:h-12 border-border/50 hover:bg-muted/50 backdrop-blur-sm sm:flex-1 transition-all duration-200"
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 sm:h-12 btn-gradient sm:flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!projectName.trim() || isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 size={16} className="sm:w-[18px] sm:h-[18px] animate-spin" />
                  {editingProject ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                editingProject ? 'Update Project' : 'Create Project'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;