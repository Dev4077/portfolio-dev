import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAbout,
  useUpdateAbout,
  getGetAboutQueryKey,
  type AboutInput,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";
import { uploadProfileImage } from "@/lib/upload-profile";
import { Skeleton } from "@/components/ui/skeleton";

const aboutSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  tagline: z.string().min(1, "Tagline is required"),
  yearsOfExperience: z.number().int().optional().nullable(),
  projectsCompleted: z.number().int().optional().nullable(),
  technologiesUsed: z.number().int().optional().nullable(),
  profileImageUrl: z
    .string()
    .optional()
    .nullable()
    .refine(
      (v) => !v || v === "" || v.startsWith("/") || /^https?:\/\//.test(v),
      "Use a path like /profile.png or a full https URL",
    ),
  resumeUrl: z.string().url().optional().nullable().or(z.literal("")),
  githubUrl: z.string().url().optional().nullable().or(z.literal("")),
  linkedinUrl: z.string().url().optional().nullable().or(z.literal("")),
  twitterUrl: z.string().url().optional().nullable().or(z.literal("")),
  email: z.string().email("Valid email is required"),
  location: z.string().optional().nullable(),
  codingPhilosophy: z.string().optional().nullable()
});

export default function AdminAbout() {
  const queryClient = useQueryClient();
  const { data: about, isLoading } = useGetAbout();
  const updateAbout = useUpdateAbout();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      bio: "",
      tagline: "",
      yearsOfExperience: 0,
      projectsCompleted: 0,
      technologiesUsed: 0,
      profileImageUrl: "",
      resumeUrl: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      email: "",
      location: "",
      codingPhilosophy: ""
    }
  });

  useEffect(() => {
    if (about) {
      form.reset(about);
    }
  }, [about, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadProfileImage(file);
      form.setValue("profileImageUrl", url, { shouldDirty: true });
      toast.success("Profile image uploaded");
      queryClient.invalidateQueries({ queryKey: getGetAboutQueryKey() });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onSubmit = (values: z.infer<typeof aboutSchema>) => {
    const data: AboutInput = {
      ...values,
      yearsOfExperience: values.yearsOfExperience ?? undefined,
      projectsCompleted: values.projectsCompleted ?? undefined,
      technologiesUsed: values.technologiesUsed ?? undefined,
    };
    toast.promise(updateAbout.mutateAsync({ data }), {
      loading: "Saving profile...",
      success: () => {
        queryClient.invalidateQueries({ queryKey: getGetAboutQueryKey() });
        return "Profile updated successfully";
      },
      error: "Failed to update profile"
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">About Me</h1>
          <p className="text-muted-foreground font-mono text-sm">Loading profile data...</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full bg-secondary/50 rounded-xl" />
          <Skeleton className="h-[400px] w-full bg-secondary/50 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">About Me</h1>
          <p className="text-muted-foreground font-mono text-sm">Manage your profile and configuration.</p>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={updateAbout.isPending} data-testid="button-save-about">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

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
              <div className="space-y-3">
                <p className="text-sm font-medium leading-none">Homepage profile photo</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-32 h-40 rounded-lg overflow-hidden border border-white/10 bg-secondary/30 shrink-0">
                    <img
                      src={form.watch("profileImageUrl") || "/profile.png"}
                      alt="Profile preview"
                      className="w-full h-full object-cover object-top"
                      onError={(ev) => {
                        ev.currentTarget.src = "/profile.png";
                      }}
                    />
                  </div>
                  <div className="space-y-2 flex-1 w-full">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto font-mono"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? "Uploading…" : "Upload new photo"}
                    </Button>
                    <FormField
                      control={form.control}
                      name="profileImageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-muted-foreground">Or paste image URL / path</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} placeholder="/profile.png" />
                          </FormControl>
                          <FormDescription>Shown on the homepage hero (desktop & mobile).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
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
        </form>
      </Form>
    </div>
  );
}
