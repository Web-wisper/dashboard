import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, User, Settings, LogOut, FileText, Layout, BarChart, Mic, Home, AppWindow, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TopBarProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

interface SearchItem {
  id: string;
  title: string;
  type: 'page' | 'action';
  path: string;
  icon: React.ElementType;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: 'overview', title: 'Overview', type: 'page', path: '/dashboard', icon: Home },
  { id: 'projects', title: 'Projects', type: 'page', path: '/dashboard/projects', icon: AppWindow },
  { id: 'voice-builder', title: 'Voice Builder', type: 'page', path: '/dashboard/voice-builder', icon: Mic },
  { id: 'templates', title: 'Templates', type: 'page', path: '/dashboard/templates', icon: Layout },
  { id: 'analytics', title: 'Analytics', type: 'page', path: '/dashboard/analytics', icon: BarChart },
  { id: 'settings', title: 'Settings', type: 'page', path: '/dashboard/settings', icon: Settings },
  { id: 'create-project', title: 'Create New Project', type: 'action', path: '/dashboard/projects?new=true', icon: FileText },
];

const TopBar = ({ onMenuClick, onToggleSidebar, isSidebarCollapsed }: TopBarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New feature available: Voice Cloning', time: '2 min ago', text: 'Try out our new voice cloning technology directly in the studio.', unread: true },
    { id: 2, title: 'Project export completed', time: '1 hour ago', text: 'Your project "Marketing Video" has been successfully exported.', unread: true },
    { id: 3, title: 'Welcome to Whisper AI', time: '1 day ago', text: 'Get started by creating your first voice project.', unread: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = SEARCH_ITEMS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowResults(false);
    setIsSearchOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      {/* Mobile search modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-start justify-center pt-20 px-4 md:hidden">
          <div className="w-full max-w-md animate-scale-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-opacity-50" size={20} />
              <input
                type="text"
                placeholder="Search projects, pages, tools…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-card border border-border rounded-xl text-body focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-opacity-50 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleResultClick(item.path)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left border-b border-border/50 last:border-0"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-body-sm">{item.title}</p>
                      <p className="text-label-sm text-opacity-50 capitalize">{item.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div className="mt-4 p-4 text-center text-opacity-50 text-body-sm">
                No results found.
              </div>
            )}
          </div>
        </div>
      )}

      <header
        className={cn(
          "fixed top-0 right-0 h-topbar bg-background/80 backdrop-blur-md border-b border-border z-30 transition-all duration-250 ease-out",
          isSidebarCollapsed ? "md:left-sidebar-collapsed" : "md:left-sidebar",
          "left-0"
        )}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex p-2 bg-muted/50 hover:bg-muted border border-border/50 rounded-lg shadow-sm transition-all duration-200 text-opacity-70 hover:text-primary active:scale-95"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 justify-center max-w-xl mx-auto" ref={searchRef}>
            <div className="relative w-full">
              <div className="relative w-full search-glow rounded-lg transition-shadow duration-200">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-opacity-50" size={18} />
                <input
                  type="text"
                  placeholder="Search projects, pages, tools…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery) setShowResults(true);
                  }}
                  className="w-full h-10 pl-11 pr-4 bg-input border border-border rounded-lg text-body-sm focus:outline-none focus:border-primary transition-colors placeholder:text-opacity-30"
                />
              </div>

              {/* Desktop Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      <p className="px-4 py-2 text-xs font-semibold text-opacity-50 uppercase tracking-wider">
                        Results
                      </p>
                      {searchResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item.path)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="p-1.5 bg-primary/10 rounded-md">
                            <item.icon size={16} className="text-primary" />
                          </div>
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.type === 'action' && (
                            <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Action</span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm text-opacity-50">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 hover:bg-muted rounded-lg transition-colors group outline-none">
                  <Bell size={20} className="text-opacity-70 group-hover:text-foreground transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center bg-destructive text-white text-[10px] font-bold rounded-full animate-in zoom-in duration-200 ring-2 ring-background">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[92vw] sm:w-80 -mr-3 sm:mr-0 bg-popover border-border dropdown-enter p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          "px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer",
                          notification.unread ? "bg-primary/5" : ""
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-2 h-2 mt-1.5 rounded-full flex-shrink-0",
                            notification.unread ? "bg-primary" : "bg-transparent"
                          )} />
                          <div>
                            <p className={cn("text-sm font-medium mb-1", notification.unread ? "text-foreground" : "text-opacity-70")}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-opacity-50 mb-1.5 line-clamp-2">
                              {notification.text}
                            </p>
                            <span className="text-[10px] text-opacity-30 uppercase tracking-wider font-medium">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-opacity-50 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 hover:bg-muted rounded-lg transition-colors">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-label-sm">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-popover border-border dropdown-enter"
              >
                <div className="px-3 py-2">
                  <p className="text-label font-medium">{user?.name}</p>
                  <p className="text-label-sm text-opacity-50 truncate">{user?.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-muted focus:bg-muted"
                  onClick={() => navigate('/dashboard/settings')}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
