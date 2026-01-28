import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard = ({ title, value, icon, trend, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className="glass-card p-5 stagger-fade-in hover:scale-[1.02] transition-transform duration-200 ease-out"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-label-sm font-medium",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <p className="text-opacity-50 text-label-sm mb-1">{title}</p>
      <p className="text-h3 font-heading font-semibold">{value}</p>
    </div>
  );
};

export default StatCard;
