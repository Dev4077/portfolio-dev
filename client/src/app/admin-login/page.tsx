"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await loginAction(formData);
    
    if (result.success) {
      toast.success("Authentication successful");
      router.push("/admin");
    } else {
      toast.error(result.error || "Authentication failed. Access denied.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-50 z-0"></div>
      <div className="absolute inset-0 scanline z-10"></div>

      <div className="glass-panel p-8 rounded-xl neon-border w-full max-w-md relative z-20">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-secondary/80 rounded-full flex items-center justify-center mb-4 border border-primary/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-sans tracking-tight">System Admin Access</h1>
          <p className="text-muted-foreground font-mono text-sm mt-2 flex items-center">
            <Terminal className="h-3 w-3 mr-2 text-primary" /> /auth/login
          </p>
        </div>

        <form action={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs text-muted-foreground">Admin ID</label>
            <Input 
              name="email"
              placeholder="admin" 
              className="bg-background/50 border-white/10 font-mono text-sm focus-visible:border-primary" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs text-muted-foreground">Passphrase</label>
            <Input 
              name="password"
              type="password"
              placeholder="••••••••" 
              className="bg-background/50 border-white/10 font-mono text-sm focus-visible:border-primary" 
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full neon-border bg-primary/10 hover:bg-primary/20 text-primary font-mono mt-4" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Authenticating..." : "Initialize Session"}
          </Button>
        </form>
        
        <div className="mt-8 text-center text-xs font-mono text-muted-foreground/50">
          Unauthorized access is strictly prohibited and logged.
        </div>
      </div>
    </div>
  );
}
