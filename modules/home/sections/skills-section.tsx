import { fullStackSections } from "@/data/tech-stack";

// Add brief hiring manager-friendly summaries for each group to explain domain relevance
const sectionDescriptions: Record<string, string> = {
  "Frontend": "Crafting interactive, responsive, and type-safe interfaces.",
  "Backend": "Architecting secure APIs, background workers, and real-time syncing.",
  "Database": "Designing data models, caching layers, and querying structures.",
  "DevOps & Tools": "Containerization, CI/CD automation, and fast local workflows.",
  "AI & LLM": "Integrating LangGraph agentic workflows and local/cloud LLMs.",
  "Cloud Services": "Deploying scalable systems, object storage, and compute resources."
};

export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col gap-6 mt-10">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground font-mono uppercase">Tech</p>
        <h2 className="text-2xl font-bold text-foreground">Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {fullStackSections.map((section) => {
          const desc = sectionDescriptions[section.label] || "";
          return (
            <div
              key={section.label}
              className="clay-card p-5 flex flex-col gap-4 border border-foreground/5!"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-border/30">
                <div className="text-muted-foreground">
                  {section.icon}
                </div>
                <h3 className="text-sm font-semibold font-mono text-foreground/90 uppercase tracking-wider">
                  {section.label}
                </h3>
              </div>

              {/* Desc */}
              {desc && (
                <p className="text-xs text-muted-foreground leading-relaxed -mt-1 font-sans">
                  {desc}
                </p>
              )}

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {section.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-foreground/90 bg-muted/30 border border-foreground/5 cursor-default"
                  >
                    <div className="flex items-center justify-center shrink-0 w-4.5 h-4.5 [&_svg]:w-full! [&_svg]:h-full!">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold font-mono tracking-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


