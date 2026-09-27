import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-8 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-muted-foreground font-sans text-xs">
          &copy; {new Date().getFullYear()} Dev. All rights reserved.
        </div>
        
        <div className="text-muted-foreground font-sans text-xs flex items-center gap-4">
          <span>Better software. Better experiences.</span>
          <Link
            href="/admin"
            className="opacity-20 hover:opacity-100 transition-opacity"
            data-testid="link-footer-admin"
          >
            &#x2699;
          </Link>
        </div>
      </div>
    </footer>
  );
}
