import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListEducation,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
  getListEducationQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, GraduationCap, Loader2 } from "lucide-react";

interface FormState {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade: string;
  description: string;
  achievementsRaw: string;
  order: number;
}

const defaultForm: FormState = {
  institution: "",
  degree: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  grade: "",
  description: "",
  achievementsRaw: "",
  order: 0,
};

export default function AdminEducation() {
  const qc = useQueryClient();
  const { data: list = [], isLoading } = useListEducation();
  const createMut = useCreateEducation();
  const updateMut = useUpdateEducation();
  const deleteMut = useDeleteEducation();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);

  function invalidate() {
    qc.invalidateQueries({ queryKey: getListEducationQueryKey() });
  }

  function openCreate() {
    setEditingId(null);
    setForm(defaultForm);
    setOpen(true);
  }

  function openEdit(edu: (typeof list)[0]) {
    setEditingId(edu.id);
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      location: edu.location ?? "",
      startDate: edu.startDate,
      endDate: edu.endDate ?? "",
      current: edu.current,
      grade: edu.grade ?? "",
      description: edu.description ?? "",
      achievementsRaw: (edu.achievements ?? []).join("\n"),
      order: edu.order,
    });
    setOpen(true);
  }

  function handleSubmit() {
    const payload = {
      institution: form.institution,
      degree: form.degree,
      field: form.field,
      location: form.location || null,
      startDate: form.startDate,
      endDate: form.current ? null : form.endDate || null,
      current: form.current,
      grade: form.grade || null,
      description: form.description || null,
      achievements: form.achievementsRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      order: form.order,
    };

    if (editingId !== null) {
      updateMut.mutate(
        { id: editingId, data: payload },
        {
          onSuccess: () => {
            toast.success("Education updated");
            invalidate();
            setOpen(false);
          },
          onError: () => toast.error("Failed to update"),
        }
      );
    } else {
      createMut.mutate(
        { data: payload },
        {
          onSuccess: () => {
            toast.success("Education added");
            invalidate();
            setOpen(false);
          },
          onError: () => toast.error("Failed to add"),
        }
      );
    }
  }

  function handleDelete(id: string) {
    deleteMut.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Deleted");
          invalidate();
        },
        onError: () => toast.error("Failed to delete"),
      }
    );
  }

  const sorted = [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  const isSaving = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Education</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage academic background and certifications
          </p>
        </div>
        <Button
          onClick={openCreate}
          data-testid="button-add-education"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-mono text-sm border border-dashed border-white/10 rounded-lg">
          // No education records yet
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((edu) => (
            <div
              key={edu.id}
              data-testid={`education-card-${edu.id}`}
              className="flex items-start gap-4 p-4 rounded-lg border border-white/8 bg-card/60"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      {edu.degree} — {edu.field}
                    </p>
                    <p className="text-sm text-primary font-mono">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {edu.startDate} — {edu.current ? "Present" : (edu.endDate ?? "")}
                      {edu.grade && (
                        <span className="ml-3 text-accent">{edu.grade}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      data-testid={`button-edit-education-${edu.id}`}
                      onClick={() => openEdit(edu)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      data-testid={`button-delete-education-${edu.id}`}
                      onClick={() => handleDelete(edu.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-white/10 max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground font-mono">
              {editingId !== null ? "// Edit Education" : "// Add Education"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label className="text-muted-foreground text-xs">Institution *</Label>
                <Input
                  data-testid="input-institution"
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="University of Mumbai"
                  className="bg-secondary/30 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Degree *</Label>
                <Input
                  data-testid="input-degree"
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="B.E. / B.Tech / M.Tech"
                  className="bg-secondary/30 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Field *</Label>
                <Input
                  data-testid="input-field"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  placeholder="Computer Engineering"
                  className="bg-secondary/30 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Location</Label>
                <Input
                  data-testid="input-location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Mumbai, India"
                  className="bg-secondary/30 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Grade / CGPA</Label>
                <Input
                  data-testid="input-grade"
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  placeholder="8.4 CGPA"
                  className="bg-secondary/30 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Start Date *</Label>
                <Input
                  data-testid="input-start-date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  placeholder="Aug 2019"
                  className="bg-secondary/30 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">End Date</Label>
                <Input
                  data-testid="input-end-date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  placeholder="May 2023"
                  disabled={form.current}
                  className="bg-secondary/30 border-white/10 disabled:opacity-40"
                />
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Switch
                  data-testid="switch-current"
                  checked={form.current}
                  onCheckedChange={(v) => setForm({ ...form, current: v })}
                />
                <Label className="text-muted-foreground text-xs">Currently studying here</Label>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Description</Label>
              <Textarea
                data-testid="textarea-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief overview of studies..."
                className="bg-secondary/30 border-white/10 min-h-[80px]"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">
                Achievements <span className="text-muted-foreground/60">(one per line)</span>
              </Label>
              <Textarea
                data-testid="textarea-achievements"
                value={form.achievementsRaw}
                onChange={(e) => setForm({ ...form, achievementsRaw: e.target.value })}
                placeholder={"Best project award\nPublished paper on distributed systems"}
                className="bg-secondary/30 border-white/10 min-h-[80px]"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Display Order</Label>
              <Input
                data-testid="input-order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="bg-secondary/30 border-white/10 w-24"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={isSaving || !form.institution || !form.degree || !form.field || !form.startDate}
                data-testid="button-save-education"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId !== null ? "Update" : "Add"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                data-testid="button-cancel-education"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
