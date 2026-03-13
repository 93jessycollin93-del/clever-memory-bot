import { useState, useEffect } from "react";
import DocsSidebar from "@/components/DocsSidebar";
import DocsContent from "@/components/DocsContent";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <DocsSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
      <DocsContent />
    </div>
  );
};

export default Index;
