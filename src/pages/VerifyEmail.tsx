import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { signUp, isLoaded, setActive } = useSignUp();
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        // If no signup in progress, redirect to signup
        if (isLoaded && !signUp) {
            navigate('/signup');
        }
    }, [isLoaded, signUp, navigate]);

    const handleVerify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!isLoaded || !signUp || code.length !== 6) return;

        setIsVerifying(true);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (result.status === 'complete') {
                // Sign the user in
                await setActive({ session: result.createdSessionId });
                toast.success('Email verified successfully!');
                navigate('/dashboard');
            } else {
                toast.error('Verification incomplete. Please try again.');
            }
        } catch (err: any) {
            toast.error(err?.errors?.[0]?.message || 'Invalid verification code');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendCode = async () => {
        if (!isLoaded || !signUp) return;

        setIsResending(true);

        try {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            toast.success('Verification code resent to your email');
        } catch (err: any) {
            toast.error(err?.errors?.[0]?.message || 'Failed to resend code');
        } finally {
            setIsResending(false);
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

                {/* Logo at Top Left */}
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

                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>

                        <h1 className="text-h2 font-heading mb-3 text-white">Verify Your Email</h1>
                        <p className="text-white/60 text-body-lg text-center leading-relaxed">
                            Enter the 6-digit code we sent to{' '}
                            <span className="text-white font-medium">
                                {signUp?.emailAddress}
                            </span>
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-8">
                        <div className="flex justify-center md:justify-start">
                            <InputOTP
                                maxLength={6}
                                value={code}
                                onChange={(value) => setCode(value)}
                                onComplete={() => handleVerify()}
                            >
                                <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={0} className="w-12 h-14 md:w-14 md:h-16 text-xl bg-white/5 border-white/10 text-white rounded-xl focus:border-primary/50 transition-all" />
                                    <InputOTPSlot index={1} className="w-12 h-14 md:w-14 md:h-16 text-xl bg-white/5 border-white/10 text-white rounded-xl focus:border-primary/50 transition-all" />
                                    <InputOTPSlot index={2} className="w-12 h-14 md:w-14 md:h-16 text-xl bg-white/5 border-white/10 text-white rounded-xl focus:border-primary/50 transition-all" />
                                    <InputOTPSlot index={3} className="w-12 h-14 md:w-14 md:h-16 text-xl bg-white/5 border-white/10 text-white rounded-xl focus:border-primary/50 transition-all" />
                                    <InputOTPSlot index={4} className="w-12 h-14 md:w-14 md:h-16 text-xl bg-white/5 border-white/10 text-white rounded-xl focus:border-primary/50 transition-all" />
                                    <InputOTPSlot index={5} className="w-12 h-14 md:w-14 md:h-16 text-xl bg-white/5 border-white/10 text-white rounded-xl focus:border-primary/50 transition-all" />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 btn-gradient text-white rounded-xl shadow-lg shadow-primary/20 text-body font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
                            disabled={isVerifying || code.length !== 6}
                        >
                            {isVerifying ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                'Verify Email'
                            )}
                        </Button>

                        <div className="text-center pt-4">
                            <p className="text-white/40 text-body-sm mb-2">
                                Didn't receive the code?
                            </p>
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={isResending}
                                className="text-primary hover:text-accent font-semibold transition-colors disabled:opacity-50"
                            >
                                {isResending ? 'Resending...' : 'Resend Code'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
