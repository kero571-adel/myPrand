import { ReactNode } from 'react';

interface SpecLine {
  key: string;
  value: string;
}

interface CodeBlockProps {
  title?: string;
  filename?: string;
  children?: ReactNode;
  className?: string;
  showDots?: boolean;
  lines?: SpecLine[];
}

export default function CodeBlock({
  title,
  filename,
  children,
  className = '',
  showDots = true,
  lines,
}: CodeBlockProps) {
  return (
    <div
      className={`relative bg-[#080d08] border border-[#1a2e1a] rounded-sm overflow-hidden ${className}`}
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1a2e1a] bg-[#0a0f0a]">
        <div className="flex items-center gap-2">
          {showDots && (
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
          )}
          {filename && (
            <span className="text-[10px] text-[#5a7a5a] ml-1">{filename}</span>
          )}
        </div>
        {title && (
          <span className="text-[10px] text-[#5a7a5a] tracking-wider">{title}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {lines ? (
          <div className="space-y-1">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-4 text-xs">
                <span className="text-[#2a4a2a] w-6 text-right select-none flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[#8aaa8a]">&quot;{line.key}&quot;</span>
                  <span className="text-[#5a7a5a]">:</span>
                  <span className="text-[#00FF00]">&quot;{line.value}&quot;</span>
                  {i < lines.length - 1 && <span className="text-[#5a7a5a]">,</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
