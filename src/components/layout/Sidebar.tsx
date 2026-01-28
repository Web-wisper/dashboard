import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Mic,
  Sparkles,
  BarChart3,
  Puzzle,
  Settings,
  X,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { path: '/dashboard/voice-builder', label: 'Voice Builder', icon: Mic },
  { path: '/dashboard/content-ai', label: 'Content AI', icon: Sparkles },
  { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/dashboard/integrations', label: 'Integrations', icon: Puzzle },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose, isCollapsed }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 transition-all duration-250 ease-out",
          "flex flex-col",
          // Mobile: drawer
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          // Width
          isCollapsed ? "md:w-sidebar-collapsed" : "md:w-sidebar",
          "w-sidebar"
        )}
      >
        {/* Header */}
        <div className={cn(
          "h-topbar flex items-center border-b border-sidebar-border px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <img src="/Logo.svg" alt="Web-Whisper Logo" className="w-28 h-20 object-contain" />
            </div>
          )}
          {isCollapsed && (
            <img src="/Logo.svg" alt="Web-Whisper Logo" className="w-20 h-10 object-contain mx-auto" />
          )}
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto scrollbar-thin">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-out group",
                      isActive
                        ? "bg-sidebar-accent text-foreground"
                        : "text-opacity-70 hover:bg-sidebar-accent/50 hover:text-foreground hover:translate-x-1",
                      isCollapsed && "md:justify-center md:px-0"
                    )}
                  >
                    {isActive && (
                      <div className="sidebar-active-indicator" />
                    )}
                    <item.icon
                      size={20}
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive ? "text-primary" : "group-hover:text-primary"
                      )}
                    />
                    {(!isCollapsed || !window.matchMedia('(min-width: 768px)').matches) && (
                      <span className={cn(
                        "text-label whitespace-nowrap",
                        isCollapsed && "md:hidden"
                      )}>
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-4 border-t border-sidebar-border space-y-3",
          isCollapsed && "md:p-2"
        )}>
          {/* Product Banner */}
          {!isCollapsed && (
            <div className="glass-card p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h4 className="font-heading text-label font-semibold mb-2">Our Product</h4>
              <p className="text-label-sm text-opacity-70 mb-3">Discover Whisper AI Studio</p>
              <a
                href="https://web-whisper.com/whisper-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient w-full h-9 px-3 rounded-lg flex items-center justify-center gap-2 text-label-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Visit Now
                <ExternalLink size={14} />
              </a>
            </div>
          )}
          <div className={cn(
            "glass-card p-3 text-center",
            isCollapsed && "md:hidden"
          )}>
            <p className="text-label-sm text-opacity-50">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
