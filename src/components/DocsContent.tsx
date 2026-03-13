import CodeBlock from "./CodeBlock";

const DocsContent = () => {
  return (
    <main className="flex-1 max-w-3xl py-12 px-8 lg:px-12">
      {/* Overview */}
      <section id="overview" className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          AI Assistant Module
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          A Python module for building an always-on, context-aware AI assistant with persistent memory, 
          multi-service integrations, and built-in security scanning.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Persistent Memory", desc: "Cross-session context retention" },
            { title: "Google Services", desc: "Gmail, Sheets & Calendar hooks" },
            { title: "Telegram Bot", desc: "Text & voice message handling" },
            { title: "Security Scanning", desc: "Regex-based secret detection" },
          ].map((f) => (
            <div key={f.title} className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-sm text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Persistent Memory */}
      <section id="persistent-memory" className="mb-16">
        <h2 className="section-heading">Persistent Memory</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The assistant uses an in-memory <span className="inline-code">deque</span> to store conversation 
          history by default. This can be swapped for an external store like MemMachine to achieve 
          cross-session, persistent memory.
        </p>
        <CodeBlock
          filename="memory_store.py"
          code={`from collections import deque

class MemoryStore:
    """Extensible memory backend for the assistant."""
    
    def __init__(self, max_history: int = 1000):
        self._history = deque(maxlen=max_history)
    
    def add(self, role: str, content: str) -> None:
        self._history.append({"role": role, "content": content})
    
    def get_context(self, last_n: int = 50) -> list[dict]:
        """Return the last N messages for LLM context."""
        return list(self._history)[-last_n:]
    
    def clear(self) -> None:
        self._history.clear()`}
        />
        <p className="text-sm text-muted-foreground mt-4">
          To use an external store, subclass <span className="inline-code">MemoryStore</span> and 
          override <span className="inline-code">add</span>, <span className="inline-code">get_context</span>, 
          and <span className="inline-code">clear</span>.
        </p>
      </section>

      {/* Extensible Architecture */}
      <section id="architecture" className="mb-16">
        <h2 className="section-heading">Extensible Architecture</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Google service integrations are defined as clearly separated handler methods, 
          making it straightforward to add authentication flows or swap implementations.
        </p>
        <CodeBlock
          filename="handlers.py"
          code={`class AssistantHandlers:
    async def _handle_email_command(self, args: dict) -> str:
        """Send or read emails via Gmail API."""
        # Implement Gmail OAuth flow and API calls
        raise NotImplementedError

    async def _handle_sheet_command(self, args: dict) -> str:
        """Read/write Google Sheets data."""
        raise NotImplementedError

    async def _handle_calendar_command(self, args: dict) -> str:
        """Manage Google Calendar events."""
        raise NotImplementedError`}
        />
      </section>

      {/* Telegram Integration */}
      <section id="telegram" className="mb-16">
        <h2 className="section-heading">Telegram Integration</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Optional Telegram bot support via <span className="inline-code">python-telegram-bot</span>. 
          Includes handlers for text commands and a placeholder for voice message transcription 
          (e.g. via OpenAI Whisper).
        </p>
        <CodeBlock
          filename="telegram_bot.py"
          code={`from telegram.ext import ApplicationBuilder, MessageHandler, filters

class TelegramBot:
    def __init__(self, token: str, assistant):
        self.app = ApplicationBuilder().token(token).build()
        self.assistant = assistant
        
        self.app.add_handler(
            MessageHandler(filters.TEXT, self._on_text)
        )
    
    async def _on_text(self, update, context):
        response = await self.assistant.process(
            update.message.text
        )
        await update.message.reply_text(response)
    
    def run(self):
        self.app.run_polling()`}
        />
      </section>

      {/* Security Scanning */}
      <section id="security" className="mb-16">
        <h2 className="section-heading">Security Scanning</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Basic regex-based checks warn you when potential API keys or passwords are detected 
          in messages before they're processed or stored.
        </p>
        <CodeBlock
          code={`import re

PATTERNS = [
    (r'(?:api[_-]?key|apikey)\\s*[:=]\\s*["\\'](\\S+)["\\'', "API key"),
    (r'(?:password|passwd|pwd)\\s*[:=]\\s*["\\'](\\S+)["\\'', "Password"),
    (r'(?:secret|token)\\s*[:=]\\s*["\\'](\\S+)["\\'', "Secret/Token"),
]

def scan_message(text: str) -> list[str]:
    warnings = []
    for pattern, label in PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            warnings.append(f"⚠ Potential {label} detected")
    return warnings`}
        />
      </section>

      {/* Proactive Suggestions */}
      <section id="suggestions" className="mb-16">
        <h2 className="section-heading">Proactive Suggestions</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The <span className="inline-code">suggest_improvements</span> method surfaces coding tips 
          without being overly chatty. Use the <span className="inline-code">/chill</span> command 
          to disable unsolicited suggestions.
        </p>
        <CodeBlock
          code={`async def suggest_improvements(self, code: str) -> str | None:
    if self.chill_mode:
        return None
    
    # Analyze code for common patterns
    suggestions = []
    if "import *" in code:
        suggestions.append("Avoid wildcard imports for clarity.")
    if len(code.split("\\n")) > 200:
        suggestions.append("Consider breaking this into smaller modules.")
    
    return "\\n".join(suggestions) if suggestions else None`}
        />
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="mb-16">
        <h2 className="section-heading">Getting Started</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Install the module and its dependencies, then initialize the assistant:
        </p>
        <CodeBlock
          code={`pip install jackie-assistant`}
          language="bash"
        />
        <CodeBlock
          filename="main.py"
          code={`import asyncio
from jackie_assistant import Assistant, MemoryStore

async def main():
    memory = MemoryStore(max_history=500)
    assistant = Assistant(memory=memory)
    
    # Optional: attach Telegram bot
    # assistant.attach_telegram(token="YOUR_BOT_TOKEN")
    
    response = await assistant.process("Hello, what can you do?")
    print(response)

asyncio.run(main())`}
        />
      </section>

      {/* Configuration */}
      <section id="configuration" className="mb-16">
        <h2 className="section-heading">Configuration</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure the assistant via environment variables or a config dict:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left px-4 py-2 font-semibold text-foreground">Variable</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Description</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-t border-border">
                <td className="px-4 py-2"><span className="inline-code">MEMORY_MAX_HISTORY</span></td>
                <td className="px-4 py-2">Max stored messages</td>
                <td className="px-4 py-2">1000</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><span className="inline-code">TELEGRAM_TOKEN</span></td>
                <td className="px-4 py-2">Telegram bot token</td>
                <td className="px-4 py-2">—</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><span className="inline-code">CHILL_MODE</span></td>
                <td className="px-4 py-2">Disable proactive suggestions</td>
                <td className="px-4 py-2">false</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><span className="inline-code">SECURITY_SCAN</span></td>
                <td className="px-4 py-2">Enable message scanning</td>
                <td className="px-4 py-2">true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="mb-16">
        <h2 className="section-heading">API Reference</h2>
        <div className="space-y-6">
          {[
            {
              method: "Assistant.process(message: str) → str",
              desc: "Process a user message and return the assistant's response. Automatically stores the exchange in memory.",
            },
            {
              method: "MemoryStore.add(role: str, content: str) → None",
              desc: "Add a message to the conversation history.",
            },
            {
              method: "MemoryStore.get_context(last_n: int) → list[dict]",
              desc: "Retrieve the last N messages for LLM context window.",
            },
            {
              method: "Assistant.suggest_improvements(code: str) → str | None",
              desc: "Analyze code and return improvement suggestions, or None if chill mode is active.",
            },
            {
              method: "scan_message(text: str) → list[str]",
              desc: "Scan text for potential secrets and return a list of warnings.",
            },
          ].map((item) => (
            <div key={item.method} className="border-b border-border pb-4 last:border-0">
              <code className="text-sm font-mono font-medium text-primary">{item.method}</code>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DocsContent;
