import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground font-mono text-sm">
          <span className="text-primary">&copy; {new Date().getFullYear()}</span> Dev Sakarsawala
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-github">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-linkedin">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-twitter">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-email">
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground font-mono text-xs text-center md:text-right">
          <span>Built with <span className="text-primary">React</span> + Node.js</span>
          <Link
            href="/admin"
            className="text-muted-foreground/40 hover:text-primary/70 transition-colors border border-white/5 hover:border-primary/20 px-2 py-1 rounded"
            data-testid="link-footer-admin"
          >
            [admin]
          </Link>
        </div>
      </div>
    </footer>
  );
}
