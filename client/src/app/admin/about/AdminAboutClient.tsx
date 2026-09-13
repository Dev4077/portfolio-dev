"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { updateAboutAction } from "@/app/actions/admin";

const aboutSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  tagline: z.string().min(1, "Tagline is required"),
  yearsOfExperience: z.number().int().optional().nullable(),
  projectsCompleted: z.number().int().optional().nullable(),
  technologiesUsed: z.number().int().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  resumeUrl: z.string().url().optional().nullable().or(z.literal("")),
  githubUrl: z.string().url().optional().nullable().or(z.literal("")),
  linkedinUrl: z.string().url().optional().nullable().or(z.literal("")),
  twitterUrl: z.string().url().optional().nullable().or(z.literal("")),
  email: z.string().email("Valid email is required"),
  location: z.string().optional().nullable(),
  codingPhilosophy: z.string().optional().nullable()
});

export default function AdminAboutClient({ initialData }: { initialData: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialData || {
      bio: "", tagline: "", yearsOfExperience: 0, projectsCompleted: 0,
      technologiesUsed: 0, profileImageUrl: "", resumeUrl: "", githubUrl: "",
      linkedinUrl: "", twitterUrl: "", email: "", location: "", codingPhilosophy: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof aboutSchema>) => {
    setIsSubmitting(true);
    const result = await updateAboutAction(values);
    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.error || "Failed to update profile");
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <h2 className="text-xl font-mono text-primary border-b border-white/10 pb-2 mb-4">Core Identity</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Email</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormDescription>Shown in the about section under your name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl><Textarea className="min-h-[150px]" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codingPhilosophy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coding Philosophy (Optional)</FormLabel>
                  <FormControl><Textarea className="min-h-[100px]" {...field} value={field.value || ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4 pt-4">
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Years Exp.</FormLabel>
                    <FormControl><Input type="number" {...field} value={field.value || 0} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectsCompleted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Projects</FormLabel>
                    <FormControl><Input type="number" {...field} value={field.value || 0} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technologiesUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Tech Used</FormLabel>
                    <FormControl><Input type="number" {...field} value={field.value || 0} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <h2 className="text-xl font-mono text-primary border-b border-white/10 pb-2 mb-4">Links & Media</h2>
            <FormField
              control={form.control}
              name="profileImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Profile Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="/profile.png" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl><Input {...field} value={field.value || ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl><Input {...field} value={field.value || ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl><Input {...field} value={field.value || ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter / X URL</FormLabel>
                  <FormControl><Input {...field} value={field.value || ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </form>
    </Form>
  );
}
