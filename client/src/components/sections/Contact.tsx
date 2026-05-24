import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendContactMessage, useGetAbout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Terminal, Send, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { data: about } = useGetAbout();
  const sendMessage = useSendContactMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    sendMessage.mutate({ data: values }, {
      onSuccess: () => {
        toast.success("Message transmitted successfully. I'll respond shortly.");
        form.reset();
        setIsSubmitting(false);
      },
      onError: () => {
        toast.error("Transmission failed. Please try again or use direct email.");
        setIsSubmitting(false);
      }
    });
  };

  return (
    <section id="contact" className="py-24 relative z-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-2 mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
            <span className="text-primary font-mono text-xl mr-2">05.</span>
            Initiate Connection
          </h2>
          <div className="h-1 w-20 bg-primary/50 rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-6 max-w-lg mx-auto">
            Whether you have a question, a project proposition, or just want to say hi, my inbox is open.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-8"
          >
            <div className="glass-panel p-6 rounded-xl neon-border">
              <h3 className="font-mono text-xl text-primary mb-6 flex items-center">
                <Terminal className="mr-2 h-5 w-5" /> contact_info.json
              </h3>
              
              <div className="space-y-6">
                {about?.email && (
                  <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="p-3 bg-secondary/50 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-primary/70 mb-1">email</div>
                      <a href={`mailto:${about.email}`} className="text-sm font-medium">{about.email}</a>
                    </div>
                  </div>
                )}
                
                {about?.location && (
                  <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="p-3 bg-secondary/50 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-primary/70 mb-1">location</div>
                      <span className="text-sm font-medium">{about.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-xs font-mono text-primary/70 mb-4">social_links</div>
                <div className="flex space-x-4">
                  {about?.githubUrl && (
                    <a href={about.githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {about?.linkedinUrl && (
                    <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {about?.twitterUrl && (
                    <a href={about.twitterUrl} target="_blank" rel="noreferrer" className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 glass-panel p-8 rounded-xl border border-white/10"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs text-muted-foreground">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 font-mono text-sm" {...field} data-testid="input-contact-name" />
                        </FormControl>
                        <FormMessage className="text-xs font-mono" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs text-muted-foreground">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 font-mono text-sm" {...field} data-testid="input-contact-email" />
                        </FormControl>
                        <FormMessage className="text-xs font-mono" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs text-muted-foreground">Subject (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" className="bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 font-mono text-sm" {...field} data-testid="input-contact-subject" />
                      </FormControl>
                      <FormMessage className="text-xs font-mono" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Initialize communication protocol..." 
                          className="min-h-[150px] bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 font-mono text-sm resize-none" 
                          {...field} 
                          data-testid="input-contact-message"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-mono" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full neon-border bg-primary/10 hover:bg-primary/20 text-primary font-mono" 
                  disabled={isSubmitting}
                  data-testid="button-contact-submit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Terminal className="animate-spin mr-2 h-4 w-4" /> Transmitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
