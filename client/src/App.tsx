import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import PortfolioPage from "@/pages/portfolio";
import AdminLogin from "@/pages/admin/login";
import AdminLayout from "@/pages/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProjects from "@/pages/admin/projects";
import AdminSkills from "@/pages/admin/skills";
import AdminExperience from "@/pages/admin/experience";
import AdminAbout from "@/pages/admin/about";
import AdminMessages from "@/pages/admin/messages";
import AdminEducation from "@/pages/admin/education";

const queryClient = new QueryClient();

function withAdminLayout(Page: React.ComponentType) {
  return function AdminPage() {
    return (
      <AdminLayout>
        <Page />
      </AdminLayout>
    );
  };
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={PortfolioPage} />

      <Route path="/admin/login" component={AdminLogin} />

      <Route path="/admin/projects" component={withAdminLayout(AdminProjects)} />
      <Route path="/admin/skills" component={withAdminLayout(AdminSkills)} />
      <Route path="/admin/experience" component={withAdminLayout(AdminExperience)} />
      <Route path="/admin/about" component={withAdminLayout(AdminAbout)} />
      <Route path="/admin/education" component={withAdminLayout(AdminEducation)} />
      <Route path="/admin/messages" component={withAdminLayout(AdminMessages)} />
      <Route path="/admin" component={withAdminLayout(AdminDashboard)} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster theme="dark" position="bottom-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
