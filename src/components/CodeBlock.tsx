interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = "python", filename }: CodeBlockProps) => {
  return (
    <div className="my-4">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg border border-b-0 border-code-border bg-code-bg">
          <span className="text-xs font-mono text-muted-foreground">{filename}</span>
        </div>
      )}
      <pre className={`code-block ${filename ? "rounded-t-none" : ""}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
