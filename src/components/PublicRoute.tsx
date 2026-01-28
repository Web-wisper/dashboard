import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
    children: React.ReactNode;
}

/**
 * PublicRoute component
 * Redirects authenticated users to the dashboard.
 * Prevents logged-in users from accessing login/signup pages.
 */
const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-pulse">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-white/40 text-sm font-medium animate-pulse">Checking session...</p>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
