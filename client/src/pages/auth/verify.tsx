import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Mail, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmail() {
  const { verify, user } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const handleVerify = async () => {
    setIsVerifying(true);
    await verify();
    setIsVerifying(false);
    setIsVerified(true);
    toast({
      title: "Email Verified!",
      description: "Your account is now fully active.",
    });
    setTimeout(() => setLocation("/dashboard"), 2000);
  };

  const handleResend = () => {
    setTimer(30);
    toast({
      title: "Email Sent",
      description: "We've sent another verification link to your inbox.",
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (isVerified) {
    return (
      <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold">You're all set!</h2>
        <p className="text-muted-foreground">Welcome to Neobank. Redirecting you to your dashboard...</p>
        <Button className="w-full h-11" onClick={() => setLocation("/dashboard")}>
          Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-primary/5">
        <Mail className="w-10 h-10" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold">Check your inbox</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          We sent a verification link to <span className="text-foreground font-medium">{user?.email || "your email"}</span>.
          Click the link to activate your account.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {/* Simulation Button */}
        <Button 
          variant="default" 
          className="w-full h-11" 
          onClick={handleVerify}
          disabled={isVerifying}
        >
          {isVerifying ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isVerifying ? "Verifying..." : "Simulate: Click Link in Email"}
        </Button>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResend}
            disabled={timer > 0}
            className="text-primary"
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend verification email"}
          </Button>
        </div>

        <Link href="/login">
          <Button variant="link" className="text-muted-foreground mt-4">
            Back to login
          </Button>
        </Link>
      </div>
    </div>
  );
}
