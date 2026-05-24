import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Terminal, Lock } from "lucide-react";
import { useAdminLogin } from "@workspace/api-client-react";
import { setToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const loginMutation = useAdminLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    loginMutation.mutate({ data: values }, {
      onSuccess: (response) => {
        setToken(response.token);
        toast.success("Authentication successful");
        setLocation("/admin");
      },
      onError: () => {
        toast.error("Authentication failed. Access denied.");
        setIsSubmitting(false);
      }
    });
  };

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs text-muted-foreground">Admin Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="admin@example.com" 
                      className="bg-background/50 border-white/10 font-mono text-sm focus-visible:border-primary" 
                      {...field} 
                      data-testid="input-login-email"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-mono" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs text-muted-foreground">Passphrase</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      className="bg-background/50 border-white/10 font-mono text-sm focus-visible:border-primary" 
                      {...field} 
                      data-testid="input-login-password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-mono" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full neon-border bg-primary/10 hover:bg-primary/20 text-primary font-mono mt-4" 
              disabled={isSubmitting}
              data-testid="button-login-submit"
            >
              {isSubmitting ? "Authenticating..." : "Initialize Session"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-8 text-center text-xs font-mono text-muted-foreground/50">
          Unauthorized access is strictly prohibited and logged.
        </div>
      </div>
    </div>
  );
}
