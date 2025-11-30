import { Link, useLocation } from "wouter";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-sidebar border-r border-border p-12 flex-col justify-between overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[100px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">Neobank</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-md"
          >
            <h1 className="text-5xl font-display font-bold leading-tight mb-6">
              The future of finance is <span className="text-primary">here.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join millions who trust Neobank for banking, investments, and insurance. 
              Secure, seamless, and built for the modern world.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex gap-8 text-sm text-muted-foreground">
          <span>© 2025 Neobank Financial</span>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background lg:hidden" />
        
        <div className="w-full max-w-[400px] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
