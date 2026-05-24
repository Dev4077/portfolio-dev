import { useQueryClient } from "@tanstack/react-query";
import { 
  useListContactMessages, 
  useMarkMessageRead,
  getListContactMessagesQueryKey 
} from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDisplayDate } from "@/lib/format-date";
import { Mail, MailOpen, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminMessages() {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useListContactMessages();
  const markRead = useMarkMessageRead();

  const handleMarkRead = (id: string) => {
    toast.promise(markRead.mutateAsync({ id }), {
      loading: "Marking as read...",
      success: () => {
        queryClient.invalidateQueries({ queryKey: getListContactMessagesQueryKey() });
        return "Message marked as read";
      },
      error: "Failed to update status"
    });
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
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4 bg-secondary/50 mx-auto" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 bg-secondary/50" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-16 ml-auto bg-secondary/50" /></TableCell>
                </TableRow>
              ))
            ) : messages?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-mono">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
                  No messages received yet.
                </TableCell>
              </TableRow>
            ) : (
              messages?.map((msg) => (
                <TableRow 
                  key={msg.id} 
                  className={`border-b border-white/5 border-opacity-50 ${!msg.read ? 'bg-primary/5' : ''}`}
                >
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
                        <Button variant="ghost" size="sm" className="font-mono text-xs border border-white/10 hover:bg-white/5" data-testid={`btn-view-message-${msg.id}`}>
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
                        {!msg.read && (
                          <div className="flex justify-end pt-4 border-t border-white/10">
                            <Button 
                              onClick={() => {
                                handleMarkRead(msg.id);
                                // The dialog will stay open, but we marked it read
                              }}
                              className="font-mono text-sm"
                            >
                              <Check className="mr-2 h-4 w-4" /> Mark as Read
                            </Button>
                          </div>
                        )}
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
