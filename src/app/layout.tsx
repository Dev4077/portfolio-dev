import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SakugaClientScripts } from "@/components/sakuga/SakugaClientScripts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakarsa.com";

export const viewport: Viewport = {
  themeColor: "#dc2626",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dev Sakarsawala | Full-Stack Developer & Agentic AI Engineer",
    template: "%s | Dev Sakarsawala",
  },
  description:
    "Portfolio of Dev Sakarsawala — Full-Stack SDE & Agentic AI Engineer. Building production web applications, autonomous LangGraph workflows, and scalable cloud architectures.",
  keywords: [
    "Dev Sakarsawala",
    "Full-Stack Developer",
    "SDE",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "MERN Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Software Engineer",
    "Surat",
    "India",
  ],
  authors: [{ name: "Dev Sakarsawala", url: "https://github.com/Dev4077" }],
  creator: "Dev Sakarsawala",
  publisher: "Dev Sakarsawala",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Dev Sakarsawala | Full-Stack Developer & Agentic AI Engineer",
    description:
      "Full-Stack SDE & Agentic AI Engineer. Building scalable products, production MERN apps, and autonomous agent workflows with anime impact UI.",
    siteName: "Dev Sakarsawala Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Dev Sakarsawala - Full-Stack Developer & Agentic AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Sakarsawala | Full-Stack Developer & Agentic AI Engineer",
    description:
      "Full-Stack SDE & Agentic AI Engineer building scalable systems and agentic AI workflows.",
    images: ["/profile.jpg"],
    creator: "@DevSakarsawala",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dev Sakarsawala",
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    jobTitle: "Full-Stack Developer & Agentic AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Constantsys",
    },
    sameAs: [
      "https://github.com/Dev4077",
      "https://www.linkedin.com/in/dev-sakarsawala/",
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "Agentic AI",
      "LangChain",
      "LangGraph",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "MongoDB",
      "Docker",
      "AWS",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "India",
    },
  };

  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof MutationObserver !== 'undefined') {
                    const observer = new MutationObserver(function(mutations) {
                      for (let i = 0; i < mutations.length; i++) {
                        const m = mutations[i];
                        if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                          m.target.removeAttribute('bis_skin_checked');
                        }
                      }
                    });
                    observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
                  }
                  const els = document.querySelectorAll('[bis_skin_checked]');
                  for (let i = 0; i < els.length; i++) els[i].removeAttribute('bis_skin_checked');
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script src="/sakuga-vfx/core.js" defer></script>
        <script src="/sakuga-vfx/button.js" defer></script>
        <script src="/sakuga-vfx/toggle.js" defer></script>
        <script src="/sakuga-vfx/slider.js" defer></script>
        <script src="/sakuga-vfx/checkbox.js" defer></script>
        <script src="/sakuga-vfx/radio.js" defer></script>
        <script src="/sakuga-vfx/input.js" defer></script>
        <script src="/sakuga-vfx/tabs.js" defer></script>
        <script src="/sakuga-vfx/progress.js" defer></script>
        <script src="/sakuga-vfx/rating.js" defer></script>
        <script src="/sakuga-vfx/toast.js" defer></script>
        <script src="/sakuga-vfx/tooltip.js" defer></script>
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-[#dc2626] selection:text-white min-h-screen">
        <SakugaClientScripts />
        {children}
      </body>
    </html>
  );
}
