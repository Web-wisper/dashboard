import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle responsive sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 640 && width < 1024) {
        setIsSidebarCollapsed(true);
      } else if (width >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
      />

      <TopBar
        onMenuClick={() => setIsSidebarOpen(true)}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <main
        className={cn(
          "pt-topbar min-h-screen transition-all duration-250 ease-out",
          isSidebarCollapsed ? "md:pl-sidebar-collapsed" : "md:pl-sidebar"
        )}
      >
        <div className="p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-thin">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
