import { useEffect, useState } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import { 
  Users, 
  Eye, 
  MousePointerClick, 
  Clock, 
  TrendingUp,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Analytics = () => {
  const [animatedValues, setAnimatedValues] = useState({
    visitors: 0,
    pageViews: 0,
    clicks: 0,
    avgTime: 0,
  });

  const targetValues = {
    visitors: 12847,
    pageViews: 45231,
    clicks: 3892,
    avgTime: 245,
  };

  // Count-up animation
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        visitors: Math.floor(targetValues.visitors * easeOut),
        pageViews: Math.floor(targetValues.pageViews * easeOut),
        clicks: Math.floor(targetValues.clicks * easeOut),
        avgTime: Math.floor(targetValues.avgTime * easeOut),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues(targetValues);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const chartData = [65, 45, 78, 52, 89, 67, 94, 81, 56, 72, 88, 95];
  const maxValue = Math.max(...chartData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-h2-mobile md:text-h2 font-heading mb-1">Analytics</h1>
        <p className="text-opacity-50 text-body-sm">Track your website performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Visitors"
          value={animatedValues.visitors.toLocaleString()}
          icon={<Users className="w-5 h-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatCard
          title="Page Views"
          value={animatedValues.pageViews.toLocaleString()}
          icon={<Eye className="w-5 h-5 text-primary" />}
          trend={{ value: 8, isPositive: true }}
          delay={50}
        />
        <StatCard
          title="Click Rate"
          value={animatedValues.clicks.toLocaleString()}
          icon={<MousePointerClick className="w-5 h-5 text-primary" />}
          trend={{ value: -3, isPositive: false }}
          delay={100}
        />
        <StatCard
          title="Avg. Session"
          value={formatTime(animatedValues.avgTime)}
          icon={<Clock className="w-5 h-5 text-primary" />}
          trend={{ value: 5, isPositive: true }}
          delay={150}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-h4 font-heading">Visitors Trend</h3>
            <span className="text-label-sm text-opacity-50">Last 12 months</span>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {chartData.map((value, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div 
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t-sm"
                  style={{ 
                    height: `${(value / maxValue) * 180}px`
                  }}
                />
                <span className="text-label-sm text-opacity-30 hidden sm:block">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart (simplified) */}
        <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-h4 font-heading">Conversion Rate</h3>
            <span className="text-label-sm text-opacity-50">Last 30 days</span>
          </div>
          <div className="h-48 relative">
            <svg viewBox="0 0 400 150" className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B638FF" />
                  <stop offset="100%" stopColor="#7350FF" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7350FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7350FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 100 Q 50 80, 100 90 T 200 60 T 300 75 T 400 40"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="chart-draw"
                style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
              />
              <path
                d="M 0 100 Q 50 80, 100 90 T 200 60 T 300 75 T 400 40 L 400 150 L 0 150 Z"
                fill="url(#areaGradient)"
                className="animate-fade-in"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <h3 className="text-h4 font-heading mb-4">Top Pages</h3>
        <div className="space-y-3">
          {[
            { page: '/homepage', views: 12453, percentage: 45 },
            { page: '/about', views: 8234, percentage: 30 },
            { page: '/products', views: 5621, percentage: 20 },
            { page: '/contact', views: 3412, percentage: 12 },
          ].map((item, index) => (
            <div key={item.page} className="flex items-center gap-4 stagger-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Globe size={16} className="text-primary shrink-0" />
                <span className="text-body-sm truncate">{item.page}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden hidden sm:block">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full origin-left"
                    style={{ 
                      width: `${item.percentage}%`,
                      animation: `chart-grow 0.6s ease-out ${index * 100}ms backwards`
                    }}
                  />
                </div>
                <span className="text-label-sm text-opacity-70 w-16 text-right">
                  {item.views.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
