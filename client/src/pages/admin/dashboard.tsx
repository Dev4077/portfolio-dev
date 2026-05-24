import { useGetPortfolioStats } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Code, Wrench, MessageSquare, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetPortfolioStats();

  const statCards = [
    {
      title: "Total Projects",
      value: stats?.totalProjects || 0,
      subValue: `${stats?.featuredProjects || 0} featured`,
      icon: Code,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Active Skills",
      value: stats?.totalSkills || 0,
      subValue: `${Object.keys(stats?.skillsByCategory || {}).length} categories`,
      icon: Wrench,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "Messages",
      value: stats?.totalMessages || 0,
      subValue: `${stats?.unreadMessages || 0} unread`,
      icon: MessageSquare,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Experience",
      value: stats?.yearsOfExperience || 0,
      subValue: "Years",
      icon: Clock,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">System Overview</h1>
        <p className="text-muted-foreground font-mono text-sm">Real-time metrics and portfolio status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(4).fill(0).map((_, i) => (
              <Card key={i} className="bg-secondary/20 border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-24 bg-secondary/50" />
                  <Skeleton className="h-8 w-8 rounded-full bg-secondary/50" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 bg-secondary/50 mb-2" />
                  <Skeleton className="h-3 w-20 bg-secondary/50" />
                </CardContent>
              </Card>
            ))
          : statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card key={i} className="glass-panel border-white/5 hover:border-white/10 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-mono font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-sans">{stat.value}</div>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {stat.subValue}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="font-mono text-sm text-muted-foreground">Skills Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-secondary/50" />
                <Skeleton className="h-4 w-5/6 bg-secondary/50" />
                <Skeleton className="h-4 w-4/6 bg-secondary/50" />
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.skillsByCategory && Object.entries(stats.skillsByCategory).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="font-mono text-sm">{category}</span>
                    <div className="flex items-center space-x-4 w-1/2">
                      <div className="h-2 flex-grow bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary/50" 
                          style={{ width: `${(count / (stats.totalSkills || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="font-mono text-sm text-muted-foreground">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm space-y-4 text-muted-foreground">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Database Connection</span>
                <span className="text-green-500">Online</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>API Endpoints</span>
                <span className="text-green-500">Healthy</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Last Deployment</span>
                <span className="text-foreground">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Environment</span>
                <span className="text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 rounded text-xs">Production</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
