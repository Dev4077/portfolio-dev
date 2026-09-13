import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-8 px-8 lg:px-16 xl:px-24">
      <div className="max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground font-mono text-sm">
          <span className="text-primary">&copy; {new Date().getFullYear()}</span> Dev Sakarsawala
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground font-mono text-xs">
          <span>Built with <span className="text-primary">React</span></span>
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
