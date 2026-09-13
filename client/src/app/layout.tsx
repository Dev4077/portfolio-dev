import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dev Sakarsawala | Portfolio',
  description: 'Portfolio of Dev Sakarsawala - Full-Stack Developer & Agentic AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-primary/30 selection:text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
