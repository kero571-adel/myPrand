import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { products } from '../lib/products';

const ASCII_LOGO = `
  ███████╗████████╗██╗   ██╗██╗     
  ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     
  ███████╗   ██║    ╚████╔╝ ██║     
  ╚════██║   ██║     ╚██╔╝  ██║     
  ███████║   ██║      ██║   ███████╗
  ╚══════╝   ╚═╝      ╚═╝   ╚══════╝
`;

interface TerminalLine {
  type: 'system' | 'input' | 'output-line' | 'error';
  text: string;
}

const INIT_LINES: TerminalLine[] = [
  { type: 'system', text: ASCII_LOGO },
  { type: 'system', text: 'STYL_SYSTEMS v2.4.0-STABLE // INITIALIZED' },
  { type: 'system', text: 'Type "help" to list available commands.' },
  { type: 'system', text: '─'.repeat(50) },
];

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>(INIT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const base = parts[0];

    if (base === 'clear') {
      setLines(INIT_LINES);
      return;
    }

    const newLines: TerminalLine[] = [{ type: 'input', text: `> ${cmd}` }];

    if (base === 'cd') {
      const target = parts[1];
      if (target === 'collections') {
        newLines.push({ type: 'output-line', text: '// Navigating to /collections...' });
        setLines((l) => [...l, ...newLines]);
        setTimeout(() => navigate('/collections'), 600);
        return;
      }
      if (target === 'checkout') {
        newLines.push({ type: 'output-line', text: '// Navigating to /checkout...' });
        setLines((l) => [...l, ...newLines]);
        setTimeout(() => navigate('/checkout'), 600);
        return;
      }
      if (target === '..') {
        newLines.push({ type: 'output-line', text: '// Navigating to home...' });
        setLines((l) => [...l, ...newLines]);
        setTimeout(() => navigate('/'), 600);
        return;
      }
      newLines.push({ type: 'error', text: `ERROR: No such directory: ${target}` });
    } else if (base === 'help') {
      [
        '// AVAILABLE COMMANDS:',
        '  ls              → list all products',
        '  cd collections  → navigate to collections',
        '  cd checkout     → navigate to checkout',
        '  cd ..           → go home',
        '  cat [product]   → show product details',
        '  whoami          → system info',
        '  clear           → clear terminal',
        '  help            → show this message',
      ].forEach((t) => newLines.push({ type: 'output-line', text: t }));
    } else if (base === 'ls') {
      newLines.push({ type: 'output-line', text: '// /DROP_01/ASSETS' });
      products.forEach((p, i) => {
        newLines.push({
          type: 'output-line',
          text: `  ${String(i + 1).padStart(2, '0')}  ${p.assetId.padEnd(15)} ${p.name}`,
        });
      });
    } else if (base === 'whoami') {
      ['USER: anonymous_dev', 'SYSTEM: STYL_SYSTEMS v2.4.0', 'BRANCH: main', 'STATUS: ONLINE', 'CLEARANCE: LEVEL_1'].forEach((t) =>
        newLines.push({ type: 'output-line', text: t })
      );
    } else if (base === 'cat') {
      const slug = parts[1];
      const product = products.find(
        (p) => p.slug === slug || p.name.toLowerCase().includes(slug || '')
      );
      if (product) {
        newLines.push(
          { type: 'output-line', text: `// ${product.name}` },
          { type: 'output-line', text: `price: $${product.price}` },
          { type: 'output-line', text: `status: ${product.status}` },
          { type: 'output-line', text: `category: ${product.category}` },
          { type: 'output-line', text: product.description }
        );
      } else {
        newLines.push({ type: 'error', text: `ERROR: Asset not found: ${slug}` });
      }
    } else if (trimmed === '') {
      // empty
    } else {
      newLines.push({ type: 'error', text: `COMMAND_NOT_FOUND: ${cmd}` });
      newLines.push({ type: 'output-line', text: 'Type "help" for available commands.' });
    }

    setLines((l) => [...l, ...newLines]);
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#050a05]"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      <main className="flex-1 pt-14 flex flex-col">
        <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
          {/* Terminal Window */}
          <div
            className="flex-1 flex flex-col border border-[#1a2e1a] bg-[#080d08] overflow-hidden"
            style={{ minHeight: '500px', boxShadow: '0 0 30px rgba(0,255,0,0.08)' }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="text-[10px] text-[#5a7a5a] ml-2">STYL_TERMINAL — bash</span>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-xs">
              {lines.map((line, i) => (
                <div key={i}>
                  {line.type === 'system' && (
                    <pre className="text-[#00FF00] whitespace-pre-wrap text-[10px] leading-tight">
                      {line.text}
                    </pre>
                  )}
                  {line.type === 'input' && (
                    <div className="text-[#00FF00]">{line.text}</div>
                  )}
                  {line.type === 'output-line' && (
                    <div className="text-[#8aaa8a] pl-2">{line.text}</div>
                  )}
                  {line.type === 'error' && (
                    <div className="text-red-400">{line.text}</div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 border-t border-[#1a2e1a] px-4 py-3 bg-[#0a0f0a]">
              <span className="text-[#00FF00] text-sm font-bold flex-shrink-0">styl@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent text-[#00FF00] text-sm outline-none caret-[#00FF00]"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-2 h-4 bg-[#00FF00] cursor-blink" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
