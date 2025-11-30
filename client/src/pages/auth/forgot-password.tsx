import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
    toast({
      title: "Reset link sent",
      description: "Check your email for instructions.",
    });
  };

  if (isSent) {
    return (
      <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-bold">Check your email</h2>
        <p className="text-muted-foreground">
          We've sent password reset instructions to your email address.
        </p>
        <Button variant="outline" className="w-full" onClick={() => setIsSent(false)}>
          Try another email
        </Button>
        <Link href="/login">
          <Button variant="link" className="text-muted-foreground">
            Back to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Link href="/login">
          <div className="flex items-center text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
          </div>
        </Link>
        <h2 className="text-3xl font-display font-bold tracking-tight">Reset password</h2>
        <p className="text-muted-foreground">Enter your email and we'll send you a reset link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="alex@example.com" 
            required 
            className="h-11 bg-background/50"
          />
        </div>

        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
