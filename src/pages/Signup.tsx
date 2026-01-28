import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setError('Passwords do not match');
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      toast.success('Verification code sent to your email!');
      navigate('/verify-email');
    } else {
      const errorMsg = result.error || 'Signup failed';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-background overflow-y-auto lg:overflow-hidden font-body">
      {/* Scrollable Container for Form on mobile */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-background">
        {/* Mobile Background Decorations */}
        <div className="absolute inset-0 z-0 md:hidden overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mb-32" />
        </div>

        <div className="w-full max-w-md relative z-10 animate-fade-in-left py-8">
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex flex-col items-center gap-4 mb-8 group lg:hidden mx-auto">
              <img src="/Logo.svg" alt="Web-Whisper Logo" className="w-32 h-24 object-contain group-hover:scale-110 transition-transform duration-300" />
            </Link>

            <h1 className="text-h2 font-heading mb-3 text-white">Create Account</h1>
            <p className="text-white/60 text-body-lg">Join the future of voice-powered development.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-body-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 group">
                <Label htmlFor="name" className="text-white/80 group-focus-within:text-primary transition-colors text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/10 h-12 rounded-xl transition-all"
                  disabled={isLoading}
                  required
                />
              </div>

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
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="password" className="text-white/80 group-focus-within:text-primary transition-colors text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);

                    // Calculate strength
                    let score = 0;
                    if (val.length > 5) score += 1;
                    if (val.length > 8) score += 1;
                    if (/[0-9]/.test(val)) score += 1;
                    if (/[^A-Za-z0-9]/.test(val)) score += 1;
                    setPasswordStrength(score);
                  }}
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

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="pt-2 space-y-2">
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full transition-colors duration-300 ${passwordStrength >= level
                          ? passwordStrength === 1 ? 'bg-red-500' // Weak
                            : passwordStrength === 2 ? 'bg-orange-500' // Fair
                              : passwordStrength === 3 ? 'bg-yellow-500' // Good
                                : 'bg-green-500' // Strong
                          : 'bg-white/10'
                          }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs text-right font-medium transition-colors duration-300 ${passwordStrength === 1 ? 'text-red-500'
                    : passwordStrength === 2 ? 'text-orange-500'
                      : passwordStrength === 3 ? 'text-yellow-500'
                        : passwordStrength === 4 ? 'text-green-500'
                          : 'text-white/40'
                    }`}>
                    {passwordStrength === 0 ? 'Very Weak'
                      : passwordStrength === 1 ? 'Weak'
                        : passwordStrength === 2 ? 'Fair'
                          : passwordStrength === 3 ? 'Good'
                            : 'Strong'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="confirmPassword" className="text-white/80 group-focus-within:text-primary transition-colors text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/10 h-12 rounded-xl transition-all"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 btn-gradient text-white rounded-xl shadow-lg shadow-primary/20 text-body font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all pt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>

            <p className="text-center text-white/40 text-body-sm pt-4">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-accent font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side: Visual Section with Lottie Animation */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white overflow-hidden border-l border-border/50">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-white">
          <div className="w-full h-full max-w-[80%] max-h-[80%]">
            <DotLottieReact
              src="https://lottie.host/da556f8c-8584-4d6b-89ee-7a1a632c27fa/ghNH5j4phs.lottie"
              loop
              autoplay
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-white/5 pointer-events-none" />
        </div>

        {/* Logo at Top Right for LG+ */}
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-10 flex items-center flex-row-reverse gap-3 animate-fade-in">
          <img src="/Logo.svg" alt="Web-Whisper Logo" className="w-48 h-20 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
