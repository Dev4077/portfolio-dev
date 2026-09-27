"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-12">
          <h1 className="text-2xl font-sans font-medium text-foreground tracking-tight mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Please enter your credentials to continue.
          </p>
        </div>

        <form action={onSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-medium text-muted-foreground uppercase tracking-widest">Username</label>
            <Input 
              name="email"
              placeholder="Username" 
              className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-sm transition-colors" 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-sans font-medium text-muted-foreground uppercase tracking-widest">Password</label>
            <Input 
              name="password"
              type="password"
              placeholder="••••••••" 
              className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-sm transition-colors" 
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-foreground hover:bg-foreground/90 text-background font-sans font-medium text-sm rounded-md transition-colors mt-8 py-2.5" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
           <a href="/" className="text-xs font-sans font-medium text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back to Portfolio
           </a>
           <Lock className="h-3 w-3 text-muted-foreground/30" />
        </div>
      </div>
    </div>
  );
}
