"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendMessageAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Send, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact({ about }: { about?: any }) {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await sendMessageAction(values);
      if (result.success) {
        toast.success("Message sent successfully. I'll respond shortly.");
        form.reset();
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (e) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-8 lg:px-16 xl:px-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">CONTACT</span>
        </div>

        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-colors duration-300">
              <div className="space-y-6">
                {about?.email && (
                  <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-primary/70 mb-1">Email</div>
                      <a href={`mailto:${about.email}`} className="text-sm">{about.email}</a>
                    </div>
                  </div>
                )}
                
                {about?.location && (
                  <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-primary/70 mb-1">Location</div>
                      <span className="text-sm">{about.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-xs font-mono text-primary/70 mb-4">Social</div>
                <div className="flex space-x-4">
                  {about?.githubUrl && (
                    <a href={about.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {about?.linkedinUrl && (
                    <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {about?.twitterUrl && (
                    <a href={about.twitterUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-card/40 p-8 rounded-lg border border-white/5">
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
                          <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 text-sm" {...field} data-testid="input-contact-name" />
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
                          <Input placeholder="john@example.com" className="bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 text-sm" {...field} data-testid="input-contact-email" />
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
                        <Input placeholder="Project Inquiry" className="bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 text-sm" {...field} data-testid="input-contact-subject" />
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
                          placeholder="Your message..." 
                          className="min-h-[150px] bg-background/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/20 text-sm resize-none" 
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
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-medium" 
                  disabled={isSubmitting}
                  data-testid="button-contact-submit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
