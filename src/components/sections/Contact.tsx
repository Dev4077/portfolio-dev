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
    <section id="contact" className="py-24 px-6 lg:px-8 border-b border-border">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-medium text-foreground leading-tight tracking-tight mb-4">
            LET'S BUILD SOMETHING USEFUL
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed mb-12 max-w-md">
            Have an idea? Let's turn it into reality. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="space-y-4">
            {about?.email && (
              <div className="flex flex-col">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</span>
                <a href={`mailto:${about.email}`} className="text-base font-sans font-medium text-foreground hover:text-accent transition-colors">
                  {about.email}
                </a>
              </div>
            )}

            {about?.githubUrl && (
              <div className="flex flex-col pt-4">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mb-1">GitHub</span>
                <a href={about.githubUrl} target="_blank" rel="noreferrer" className="text-base font-sans font-medium text-foreground hover:text-accent transition-colors">
                  github.com/{about.githubUrl.split("/").pop()}
                </a>
              </div>
            )}

            {about?.linkedinUrl && (
              <div className="flex flex-col pt-4">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mb-1">LinkedIn</span>
                <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="text-base font-sans font-medium text-foreground hover:text-accent transition-colors">
                  linkedin.com/in/{about.linkedinUrl.split("/in/")[1]?.split("/")[0]}
                </a>
              </div>
            )}
          </div>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-sans font-medium text-foreground">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-sm transition-colors" {...field} data-testid="input-contact-name" />
                      </FormControl>
                      <FormMessage className="text-xs font-sans text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-sans font-medium text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-sm transition-colors" {...field} data-testid="input-contact-email" />
                      </FormControl>
                      <FormMessage className="text-xs font-sans text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-sans font-medium text-foreground">Subject (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Inquiry" className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-sm transition-colors" {...field} data-testid="input-contact-subject" />
                    </FormControl>
                    <FormMessage className="text-xs font-sans text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-sans font-medium text-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message..." 
                        className="min-h-[120px] bg-transparent border border-border rounded-md focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent text-sm resize-none mt-2 transition-colors p-3" 
                        {...field} 
                        data-testid="input-contact-message"
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-sans text-destructive" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-2.5 bg-foreground hover:bg-foreground/90 text-background font-sans font-medium text-sm rounded-md transition-colors" 
                disabled={isSubmitting}
                data-testid="button-contact-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
