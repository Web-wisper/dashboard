import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import {
  Plus,
  Globe,
  Users,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';

const Overview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Websites', value: '12', icon: <Globe className="w-5 h-5 text-primary" />, trend: { value: 8, isPositive: true } },
    { title: 'Active Visitors', value: '2,847', icon: <Users className="w-5 h-5 text-primary" />, trend: { value: 12, isPositive: true } },
    { title: 'Conversion Rate', value: '3.2%', icon: <TrendingUp className="w-5 h-5 text-primary" />, trend: { value: -2, isPositive: false } },
    { title: 'Pages Generated', value: '156', icon: <Zap className="w-5 h-5 text-primary" /> },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-h2-mobile md:text-h1 font-heading mb-1">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-opacity-50 text-body-sm md:text-body">
            Here's what's happening with your websites today.
          </p>
        </div>
        <Button
          className="btn-gradient h-12 px-6 gap-2 text-body font-medium w-full md:w-auto"
          onClick={() => navigate('/dashboard/projects')}
        >
          <Plus size={20} />
          Start New Website
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            delay={index * 50}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h2 className="text-h3-mobile md:text-h3 font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors duration-200 text-left group"
            onClick={() => navigate('/dashboard/voice-builder')}
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-label font-medium">Voice Builder</p>
              <p className="text-label-sm text-opacity-50">Create with voice</p>
            </div>
            <ArrowRight className="w-4 h-4 text-opacity-30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </button>

          <button
            className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors duration-200 text-left group"
            onClick={() => navigate('/dashboard/content-ai')}
          >
            <div className="p-2 rounded-lg bg-accent/20">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-label font-medium">Content AI</p>
              <p className="text-label-sm text-opacity-50">Create with AI</p>
            </div>
            <ArrowRight className="w-4 h-4 text-opacity-30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
          </button>

          <button
            className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors duration-200 text-left group"
            onClick={() => navigate('/dashboard/analytics')}
          >
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-label font-medium">Analytics</p>
              <p className="text-label-sm text-opacity-50">View insights</p>
            </div>
            <ArrowRight className="w-4 h-4 text-opacity-30 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <h2 className="text-h3-mobile md:text-h3 font-heading mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Created new homepage', project: 'Portfolio Site', time: '2 hours ago' },
            { action: 'Published changes', project: 'E-commerce Store', time: '5 hours ago' },
            { action: 'Added contact section', project: 'Agency Website', time: 'Yesterday' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
            >
              <div>
                <p className="text-body-sm">{activity.action}</p>
                <p className="text-label-sm text-opacity-50">{activity.project}</p>
              </div>
              <span className="text-label-sm text-opacity-30">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
