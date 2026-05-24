import { motion } from "framer-motion";
import { useGetAbout } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal, Code2, Database } from "lucide-react";

export function About() {
  const { data: about, isLoading } = useGetAbout();

  return (
    <section id="about" className="py-24 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/3 relative"
          >
            <div className="glass-panel p-1 rounded-xl neon-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {isLoading ? (
                <Skeleton className="w-full aspect-square rounded-lg bg-secondary/50" />
              ) : about?.profileImageUrl ? (
                <img src={about.profileImageUrl} alt="Dev Sakarsawala" className="w-full aspect-square object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <div className="w-full aspect-square bg-secondary/50 rounded-lg flex items-center justify-center border border-white/5">
                  <Terminal className="w-24 h-24 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Floating stats */}
            <div className="absolute -right-6 top-1/4 glass-panel p-3 rounded-lg border border-white/10 shadow-xl hidden md:flex items-center space-x-2">
              <Code2 className="text-primary h-5 w-5" />
              <div>
                <div className="text-sm font-bold font-mono">{isLoading ? '-' : about?.projectsCompleted}+</div>
                <div className="text-[10px] text-muted-foreground uppercase">Projects</div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 glass-panel p-3 rounded-lg border border-white/10 shadow-xl hidden md:flex items-center space-x-2">
              <Database className="text-accent h-5 w-5" />
              <div>
                <div className="text-sm font-bold font-mono">{isLoading ? '-' : about?.technologiesUsed}+</div>
                <div className="text-[10px] text-muted-foreground uppercase">Tech Stack</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-2/3 space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
                <span className="text-primary font-mono text-xl mr-2">01.</span>
                About Me
              </h2>
              <div className="h-1 w-20 bg-primary/50 rounded-full"></div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-secondary/50" />
                <Skeleton className="h-4 w-5/6 bg-secondary/50" />
                <Skeleton className="h-4 w-4/6 bg-secondary/50" />
                <Skeleton className="h-20 w-full mt-8 bg-secondary/50" />
              </div>
            ) : about ? (
              <>
                <h3 className="text-xl font-mono text-muted-foreground">{about.tagline}</h3>
                <div className="text-muted-foreground leading-relaxed space-y-4 font-mono text-sm whitespace-pre-wrap">
                  {about.bio}
                </div>
                
                {about.codingPhilosophy && (
                  <div className="mt-8 p-6 glass-panel rounded-lg border-l-2 border-l-primary relative">
                    <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif leading-none">"</div>
                    <p className="relative z-10 text-foreground italic">
                      {about.codingPhilosophy}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">Unable to load profile data.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
