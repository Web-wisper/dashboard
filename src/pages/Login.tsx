import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      const errorMsg = result.error || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-background overflow-y-auto lg:overflow-hidden">
      {/* Visual Section with Lottie Animation */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white overflow-hidden border-r border-border/50">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-white">
          <div className="w-full h-full max-w-[80%] max-h-[80%]">
            <DotLottieReact
              src="https://lottie.host/89371d42-a3a2-4738-81a3-cccc93764caa/mC51E1zhPr.lottie"
              loop
              autoplay
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/5 pointer-events-none" />
        </div>

        {/* Logo at Top Left for LG+ */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-10 flex items-center gap-3 animate-fade-in">
          <img src="/Logo.svg" alt="Web-Whisper Logo" className="w-48 h-20 object-contain" />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-background">
        {/* Decorative elements for mobile */}
        <div className="absolute inset-0 z-0 md:hidden overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>

        <div className="w-full max-w-md relative z-10 animate-fade-in-right">
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex flex-col items-center gap-4 mb-8 group lg:hidden mx-auto">
              <img src="/Logo.svg" alt="Web-Whisper Logo" className="w-32 h-24 object-contain group-hover:scale-110 transition-transform duration-300" />
            </Link>

            <h1 className="text-h2 font-heading mb-3 text-white">Welcome Back</h1>
            <p className="text-white/60 text-body-lg">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-body-sm">
                {error}
              </div>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-white/80 group-focus-within:text-primary transition-colors text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/10 h-12 rounded-xl transition-all"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80 group-focus-within:text-primary transition-colors text-sm font-medium">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/10 h-12 rounded-xl pr-12 transition-all"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 btn-gradient text-white rounded-xl shadow-lg shadow-primary/20 text-body font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <p className="text-center text-white/40 text-body-sm pt-4">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary hover:text-accent font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
