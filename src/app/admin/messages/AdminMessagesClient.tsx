"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDisplayDate } from "@/lib/format-date";
import { Mail, MailOpen, Check, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { markMessageReadAction, deleteMessageAction } from "@/app/actions/admin";

export default function AdminMessagesClient({ initialData }: { initialData: any[] }) {
  const [messages] = useState(initialData);

  const handleMarkRead = async (id: string) => {
    const result = await markMessageReadAction(id, true);
    if (result.success) {
      toast.success("Message marked as read");
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const result = await deleteMessageAction(id);
      if (result.success) {
        toast.success("Message deleted");
      } else {
        toast.error(result.error || "Failed to delete");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">Inbox</h1>
        <p className="text-muted-foreground font-mono text-sm">Contact form submissions.</p>
      </div>

      <div className="glass-panel rounded-lg border border-white/5 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="w-12 text-center font-mono">Status</TableHead>
              <TableHead className="font-mono">Sender</TableHead>
              <TableHead className="font-mono">Subject</TableHead>
              <TableHead className="font-mono">Date</TableHead>
              <TableHead className="font-mono text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-mono">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
                  No messages received yet.
                </TableCell>
              </TableRow>
            ) : (
              messages?.map((msg) => (
                <TableRow key={msg.id} className={`border-b border-white/5 border-opacity-50 ${!msg.read ? 'bg-primary/5' : ''}`}>
                  <TableCell className="text-center">
                    {!msg.read ? (
                      <div className="w-2 h-2 rounded-full bg-primary mx-auto animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"></div>
                    ) : (
                      <MailOpen className="h-4 w-4 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${!msg.read ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.name}</div>
                    <div className="text-xs font-mono text-muted-foreground/70">{msg.email}</div>
                  </TableCell>
                  <TableCell className={`font-medium ${!msg.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {msg.subject || "(No subject)"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {formatDisplayDate(msg.createdAt, "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="font-mono text-xs border border-white/10 hover:bg-white/5">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-panel border-white/10 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-mono flex items-center justify-between border-b border-white/10 pb-4">
                            <span>{msg.subject || "Message Details"}</span>
                            <span className="text-xs font-normal text-muted-foreground">
                              {formatDisplayDate(msg.createdAt, "PPpp")}
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-6">
                          <div className="flex flex-col bg-secondary/30 p-4 rounded-lg border border-white/5">
                            <span className="text-xs font-mono text-primary mb-1">From</span>
                            <span className="font-medium">{msg.name} <span className="text-muted-foreground">&lt;{msg.email}&gt;</span></span>
                          </div>
                          <div>
                            <span className="text-xs font-mono text-primary mb-2 block">Content</span>
                            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed p-4 bg-background/50 rounded-lg border border-white/5 font-mono">
                              {msg.message}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-white/10">
                          <Button onClick={() => handleDelete(msg.id)} variant="ghost" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                          {!msg.read && (
                            <Button onClick={() => handleMarkRead(msg.id)} className="font-mono text-sm">
                              <Check className="mr-2 h-4 w-4" /> Mark as Read
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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
