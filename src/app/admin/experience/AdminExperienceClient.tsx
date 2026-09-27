"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatDateRange } from "@/lib/format-date";
import { saveExperienceAction, deleteExperienceAction } from "@/app/actions/admin";

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().optional().nullable(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable().or(z.literal("")),
  current: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
  achievements: z.string().transform(str => str.split('\n').map(s => s.trim()).filter(Boolean)),
  order: z.number().int().default(0)
});

export default function AdminExperienceClient({ initialData }: { initialData: any[] }) {
  const [experiences] = useState(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [] as any,
      order: 0
    }
  });

  const openCreate = () => {
    setEditingId(null);
    form.reset({
      company: "",
      role: "",
      location: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      current: false,
      description: "",
      achievements: [] as any,
      order: 0
    });
    setIsDialogOpen(true);
  };

  const openEdit = (exp: any) => {
    setEditingId(exp.id);
    form.reset({
      ...exp,
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : "",
      achievements: exp.achievements?.join('\n') as any
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof experienceSchema>) => {
    setIsSubmitting(true);
    const payload = {
      ...values,
      startDate: new Date(values.startDate).toISOString(),
      endDate: values.current ? null : (values.endDate ? new Date(values.endDate).toISOString() : null)
    };

    const result = await saveExperienceAction(editingId, payload);
    
    if (result.success) {
      toast.success(editingId ? "Experience updated successfully" : "Experience created successfully");
      setIsDialogOpen(false);
    } else {
      toast.error(result.error || "An error occurred");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience record?")) {
      const result = await deleteExperienceAction(id);
      if (result.success) {
        toast.success("Deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">Experience</h1>
          <p className="text-muted-foreground font-mono text-sm">Manage your work history.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="font-mono text-sm">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-panel border-white/10">
            <DialogHeader>
              <DialogTitle className="font-mono">{editingId ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl><Input {...field} value={field.value || ''} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="current"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Current Job</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date (YYYY-MM-DD)</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date (YYYY-MM-DD)</FormLabel>
                        <FormControl><Input type="date" {...field} value={field.value || ''} disabled={form.watch('current')} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="achievements"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Achievements (One per line)</FormLabel>
                        <FormControl><Textarea {...field} className="min-h-[100px]" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>Save Experience</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-panel rounded-lg border border-white/5 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="font-mono">Role & Company</TableHead>
              <TableHead className="font-mono">Timeline</TableHead>
              <TableHead className="font-mono">Order</TableHead>
              <TableHead className="font-mono text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground font-mono">No experience records found</TableCell>
              </TableRow>
            ) : (
              experiences?.map((exp) => (
                <TableRow key={exp.id} className="border-b border-white/5 border-opacity-50">
                  <TableCell className="font-medium">
                    <div className="font-bold">{exp.role}</div>
                    <div className="text-muted-foreground text-sm">{exp.company}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </TableCell>
                  <TableCell>{exp.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(exp)} className="text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
