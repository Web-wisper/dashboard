import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Bell,
  Moon,
  Globe,
  Shield,
  LogOut,
  Save,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const Settings = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || 'Product Designer');
  const [bio, setBio] = useState(user?.bio || 'Passionate about building great user experiences.');
  const [isSaving, setIsSaving] = useState(false);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    autoSave: true,
  });

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateUser({ avatar: result });
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    updateUser({
      name,
      email,
      jobTitle,
      bio
    });

    setIsSaving(false);
    toast.success("Profile saved successfully");
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.name} className="object-cover" />
                <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || 'CN'}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handlePhotoClick}
                className="w-full gap-2 border-dashed border-primary/30 hover:border-primary text-primary hover:bg-primary/5"
              >
                <Camera size={14} />
                Photo
              </Button>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50 border-input focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-input focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-muted-foreground">Job Title</Label>
                <Input
                  id="role"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-background/50 border-input focus:border-primary/50 transition-colors"
                  placeholder="e.g. Senior Developer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-muted-foreground">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-background/50 border-input focus:border-primary/50 min-h-[100px] resize-none transition-colors"
                  placeholder="Tell us a little bit about yourself"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-border/50">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-gradient h-10 px-6 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label font-medium">Email Notifications</p>
              <p className="text-label-sm text-opacity-50">Receive updates via email</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label font-medium">Push Notifications</p>
              <p className="text-label-sm text-opacity-50">Browser push notifications</p>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, pushNotifications: checked }))}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-h2-mobile md:text-h2 font-heading mb-1">Settings</h1>
        <p className="text-opacity-50 text-body-sm">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div
            key={section.title}
            className="glass-card p-5 md:p-6 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="text-h4 font-heading">{section.title}</h3>
            </div>
            {section.content}
          </div>
        );
      })}

      {/* Logout */}
      <div
        className="glass-card p-5 md:p-6 animate-fade-in"
        style={{ animationDelay: '300ms' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-h4 font-heading text-destructive">Sign Out</h3>
            <p className="text-label-sm text-opacity-50">Sign out of your account</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-destructive text-destructive hover:bg-destructive/10 gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
