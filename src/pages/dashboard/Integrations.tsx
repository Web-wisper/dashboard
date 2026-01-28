import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Search,
  Webhook,
  Mail,
  CreditCard,
  MessageSquare,
  Lock,
  Check,
  ExternalLink,
  Loader2,
  Settings2,
  Trash2,
  AlertCircle,
  Slack,
  Calendar,
  Wallet,
  Receipt
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'connected' | 'available' | 'locked';
  category: 'essential' | 'marketing' | 'payment';
}

const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'domain', name: 'Custom Domain', description: 'Connect your own domain', icon: Globe, status: 'connected', category: 'essential' },
  { id: 'seo', name: 'SEO Tools', description: 'Optimize for search engines', icon: Search, status: 'available', category: 'essential' },
  { id: 'webhooks', name: 'Webhooks', description: 'Connect external services', icon: Webhook, status: 'available', category: 'essential' },
  { id: 'mailchimp', name: 'Mailchimp', description: 'Email marketing integration', icon: Mail, status: 'available', category: 'marketing' },
  { id: 'stripe', name: 'Stripe Payments', description: 'Accept payments', icon: CreditCard, status: 'locked', category: 'payment' },
  { id: 'intercom', name: 'Intercom', description: 'Customer messaging', icon: MessageSquare, status: 'locked', category: 'marketing' },
  { id: 'analytics', name: 'Google Analytics', description: 'Track website traffic', icon: Search, status: 'available', category: 'marketing' },
  { id: 'zapier', name: 'Zapier', description: 'Automate workflows', icon: Webhook, status: 'locked', category: 'essential' },
  { id: 'slack', name: 'Slack', description: 'Team notifications & alerts', icon: Slack, status: 'available', category: 'essential' },
  { id: 'calendar', name: 'Google Calendar', description: 'Sync meetings & events', icon: Calendar, status: 'available', category: 'essential' },
  { id: 'paypal', name: 'PayPal', description: 'Accept global payments', icon: Wallet, status: 'available', category: 'payment' },
  { id: 'invoicing', name: 'Invoicing', description: 'Automated billing system', icon: Receipt, status: 'locked', category: 'payment' },
];

const Integrations = () => {
  const [items, setItems] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const categories = [
    { key: 'essential', label: 'Essential Tools' },
    { key: 'marketing', label: 'Marketing & Analytics' },
    { key: 'payment', label: 'Payments & Monetization' },
  ];

  const handleConnect = (id: string, name: string) => {
    setLoadingId(id);

    // Simulate network delay
    setTimeout(() => {
      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, status: 'connected' } : item
      ));
      setLoadingId(null);
      toast.success(`Successfully connected to ${name}`);
    }, 1500);
  };

  const handleManageClick = (integration: Integration) => {
    setSelectedIntegration(integration);
  };

  const handleDisconnect = () => {
    if (!selectedIntegration) return;

    setLoadingId(selectedIntegration.id);
    const integrationName = selectedIntegration.name;
    const integrationId = selectedIntegration.id;
    setSelectedIntegration(null); // Close dialog

    setTimeout(() => {
      setItems(prev => prev.map(item =>
        item.id === integrationId ? { ...item, status: 'available' } : item
      ));
      setLoadingId(null);
      toast.info(`Disconnected from ${integrationName}`);
    }, 1000);
  };



  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="animate-fade-in relative z-10">
        <h1 className="text-h2-mobile md:text-h2 font-heading mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Integrations
        </h1>
        <p className="text-opacity-50 text-body p-1">
          Supercharge your workflow by connecting your favorite tools and services.
        </p>
      </div>

      {/* Integration Categories */}
      <div className="space-y-8">
        {categories.map((category, categoryIndex) => {
          const categoryIntegrations = items.filter(i => i.category === category.key);

          if (categoryIntegrations.length === 0) return null;

          return (
            <div
              key={category.key}
              className="animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-h4 font-heading mb-4 ml-1 text-white">
                {category.label}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryIntegrations.map((integration, index) => {
                  const Icon = integration.icon;
                  const isLocked = integration.status === 'locked';
                  const isConnected = integration.status === 'connected';
                  const isLoading = loadingId === integration.id;

                  return (
                    <div
                      key={integration.id}
                      className={cn(
                        "group relative p-5 rounded-xl border transition-all duration-300",
                        isLocked
                          ? "bg-secondary/20 border-border/30 opacity-70"
                          : "bg-card/40 backdrop-blur-sm border-border hover:border-primary/50 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                      )}
                      style={{ animationDelay: `${(categoryIndex * 100) + (index * 50)}ms` }}
                    >
                      {/* Glow Effect on Hover */}
                      {!isLocked && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      )}

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn(
                            "p-3 rounded-xl transition-colors duration-300",
                            isLocked ? "bg-muted" : "bg-primary/10 group-hover:bg-primary/20"
                          )}>
                            <Icon size={24} className={isLocked ? "text-opacity-30" : "text-primary"} />
                          </div>

                          {isConnected && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                              <Check size={12} className="stroke-[3]" />
                              Connected
                            </div>
                          )}

                          {isLocked && (
                            <Lock size={16} className="text-opacity-30 mt-1 mr-1" />
                          )}
                        </div>

                        <div className="flex-1 mb-4">
                          <h4 className="text-lg font-heading font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
                            {integration.name}
                          </h4>
                          <p className="text-sm text-opacity-50 leading-relaxed">
                            {integration.description}
                          </p>
                        </div>

                        <Button
                          variant={isLocked ? "ghost" : isConnected ? "outline" : "default"}
                          size="sm"
                          disabled={isLocked || isLoading}
                          onClick={() => {
                            if (isConnected) {
                              handleManageClick(integration);
                            } else if (!isLocked) {
                              handleConnect(integration.id, integration.name);
                            }
                          }}
                          className={cn(
                            "w-full gap-2 transition-all duration-300 font-medium h-10",
                            isLocked
                              ? "opacity-50 cursor-not-allowed bg-transparent border border-dashed border-border text-opacity-50 hover:bg-transparent"
                              : isConnected
                                ? "border-primary/20 hover:border-primary text-foreground hover:bg-primary/10"
                                : "bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none hover:shadow-md hover:shadow-primary/25"
                          )}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Processing...
                            </>
                          ) : isLocked ? (
                            <>
                              <Lock size={14} />
                              Unlock Pro
                            </>
                          ) : isConnected ? (
                            <>
                              <Settings2 size={14} />
                              Manage
                            </>
                          ) : (
                            <>
                              <ExternalLink size={14} />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Banner */}
      <div
        className="glass-card p-6 md:p-10 text-center relative overflow-hidden animate-fade-in group mt-8"
        style={{ animationDelay: '400ms' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-50" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors duration-500" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-h3 font-heading mb-3">Unlock Premium Integrations</h3>
          <p className="text-opacity-70 text-body mb-6">
            Upgrade your plan to access powerful integrations like <span className="text-white font-medium">Stripe</span>, <span className="text-white font-medium">Zapier</span>, and <span className="text-white font-medium">Intercom</span>. Scale your business without limits.
          </p>
          <Button
            onClick={() => toast.info("Please contact our team for the upgrade")}
            className="btn-gradient h-12 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>

      {/* Manage Integration Dialog */}
      <Dialog open={!!selectedIntegration} onOpenChange={(open) => !open && setSelectedIntegration(null)}>
        <DialogContent className="sm:max-w-[420px] w-[95vw] bg-card border-border p-5 gap-5 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              Manage Integration
            </DialogTitle>
            <DialogDescription>
              Manage your connection settings for <span className="font-medium text-foreground">{selectedIntegration?.name}</span>.
            </DialogDescription>
          </DialogHeader>

          {/* Integration Status Card */}
          <div className="flex items-center gap-4 p-3.5 bg-secondary/30 rounded-xl border border-border/50">
            <div className="p-2.5 bg-background rounded-lg border border-border shadow-sm shrink-0">
              {selectedIntegration && <selectedIntegration.icon size={26} className="text-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-semibold text-base truncate pr-2">{selectedIntegration?.name}</h4>
              <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                Active & Connected
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={handleDisconnect}
              className="h-auto py-3 justify-start gap-3 border-destructive/20 hover:border-destructive hover:bg-destructive/5 text-destructive transition-all duration-200 group"
            >
              <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors shrink-0">
                <Trash2 size={18} />
              </div>
              <div className="flex flex-col items-start gap-0.5 text-left">
                <span className="font-semibold text-sm">Disconnect Integration</span>
                <span className="text-xs text-muted-foreground group-hover:text-destructive/80 font-normal">Revoke access and remove integration</span>
              </div>
            </Button>
          </div>

          <DialogFooter className="sm:justify-start w-full border-t border-border pt-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground w-full">
              <AlertCircle size={14} className="shrink-0" />
              <span className="truncate">Changes may take a few moments to sync</span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Integrations;
