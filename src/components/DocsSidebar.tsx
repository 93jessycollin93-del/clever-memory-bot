import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "persistent-memory", label: "Persistent Memory" },
  { id: "architecture", label: "Extensible Architecture" },
  { id: "telegram", label: "Telegram Integration" },
  { id: "security", label: "Security Scanning" },
  { id: "suggestions", label: "Proactive Suggestions" },
  { id: "getting-started", label: "Getting Started" },
  { id: "configuration", label: "Configuration" },
  { id: "api-reference", label: "API Reference" },
];

interface DocsSidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const DocsSidebar = ({ activeSection, onSectionClick }: DocsSidebarProps) => {
  return (
    <aside className="w-64 shrink-0 border-r border-border h-screen sticky top-0 overflow-y-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="font-bold text-lg tracking-tight text-foreground">Jackie's AI Assistant</h2>
        <p className="text-xs text-muted-foreground mt-1">Developer Documentation</p>
      </div>
      <nav className="space-y-0.5">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`nav-link w-full text-left ${
              activeSection === section.id ? "nav-link-active" : ""
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
