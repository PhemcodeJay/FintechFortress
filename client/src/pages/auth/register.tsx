import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain symbol"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  const requirements = [
    { label: "12+ characters", met: passwordValue.length >= 12 },
    { label: "Uppercase letter", met: /[A-Z]/.test(passwordValue) },
    { label: "Number", met: /[0-9]/.test(passwordValue) },
    { label: "Symbol", met: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);
    try {
      await registerUser(data.email, data.name);
      toast({
        title: "Account created",
        description: "Please verify your email address.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-display font-bold tracking-tight">Create an account</h2>
        <p className="text-muted-foreground">Join Neobank today. No hidden fees, ever.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="Alex Sterling" 
            {...register("name")} 
            className="h-11 bg-background/50"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="alex@example.com" 
            {...register("email")} 
            className="h-11 bg-background/50"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••••••" 
              {...register("password")} 
              className="h-11 bg-background/50 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs transition-colors duration-200">
                <div className={`w-1.5 h-1.5 rounded-full ${req.met ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                <span className={req.met ? "text-emerald-500" : "text-muted-foreground"}>{req.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="••••••••••••" 
            {...register("confirmPassword")} 
            className="h-11 bg-background/50"
          />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-start space-x-2 py-2">
          <Checkbox id="terms" className="mt-1" required />
          <Label htmlFor="terms" className="text-xs leading-normal text-muted-foreground font-normal">
            By creating an account, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </Label>
        </div>

        <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-primary hover:underline cursor-pointer font-medium">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
