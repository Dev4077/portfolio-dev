import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListSkills, 
  useCreateSkill, 
  useUpdateSkill, 
  useDeleteSkill,
  getListSkillsQueryKey 
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.number().min(0).max(100),
  icon: z.string().optional().nullable().or(z.literal("")),
  order: z.number().int().default(0)
});

export default function AdminSkills() {
  const queryClient = useQueryClient();
  const { data: skills, isLoading } = useListSkills();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: 50,
      icon: "",
      order: 0
    }
  });

  const openCreate = () => {
    setEditingId(null);
    form.reset({
      name: "",
      category: "",
      proficiency: 50,
      icon: "",
      order: 0
    });
    setIsDialogOpen(true);
  };

  const openEdit = (skill: any) => {
    setEditingId(skill.id);
    form.reset(skill);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: z.infer<typeof skillSchema>) => {
    const action = editingId 
      ? updateSkill.mutateAsync({ id: editingId, data: values })
      : createSkill.mutateAsync({ data: values });

    toast.promise(action, {
      loading: editingId ? "Updating skill..." : "Creating skill...",
      success: () => {
        queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
        setIsDialogOpen(false);
        return editingId ? "Skill updated successfully" : "Skill created successfully";
      },
      error: "An error occurred"
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      toast.promise(deleteSkill.mutateAsync({ id }), {
        loading: "Deleting skill...",
        success: () => {
          queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
          return "Skill deleted successfully";
        },
        error: "Failed to delete skill"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">Skills</h1>
          <p className="text-muted-foreground font-mono text-sm">Manage your technical skills.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="font-mono text-sm" data-testid="button-add-skill">
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md glass-panel border-white/10">
            <DialogHeader>
              <DialogTitle className="font-mono">{editingId ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proficiency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        <span>Proficiency</span>
                        <span className="font-mono text-primary">{field.value}%</span>
                      </FormLabel>
                      <FormControl>
                        <Slider 
                          min={0} max={100} step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>React Icon Name (Optional)</FormLabel>
                        <FormControl><Input {...field} value={field.value || ''} placeholder="e.g. SiReact" /></FormControl>
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
                  <Button type="submit" disabled={createSkill.isPending || updateSkill.isPending}>Save Skill</Button>
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
              <TableHead className="font-mono">Skill</TableHead>
              <TableHead className="font-mono">Category</TableHead>
              <TableHead className="font-mono">Proficiency</TableHead>
              <TableHead className="font-mono">Order</TableHead>
              <TableHead className="font-mono text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-16 ml-auto bg-secondary/50" /></TableCell>
                </TableRow>
              ))
            ) : skills?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-mono">No skills found</TableCell>
              </TableRow>
            ) : (
              skills?.map((skill) => (
                <TableRow key={skill.id} className="border-b border-white/5 border-opacity-50">
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell className="font-mono text-xs">{skill.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{skill.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(skill)} className="text-muted-foreground hover:text-primary" data-testid={`btn-edit-skill-${skill.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)} className="text-muted-foreground hover:text-destructive" data-testid={`btn-delete-skill-${skill.id}`}>
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
