"use client";
import React, { useState, useRef } from 'react';

export default function TerminalConsole() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Type "help" or "about" to explore...'
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    // Forces the typing cursor to jump inside the field whenever the user clicks anywhere inside the box
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let reply = `Command not found: ${cmd}. Type "help" for a list of commands.`;

      if (cmd === 'help') {
        reply = 'Available commands: about, skills, contact, clear';
      } else if (cmd === 'about') {
        reply = 'Full-Stack Engineering Intern specializing in modern web ecosystems.';
      } else if (cmd === 'skills') {
        reply = 'Next.js 14, React, TypeScript, Tailwind CSS, Node.js, Git';
      } else if (cmd === 'contact') {
        reply = 'Let\'s connect! Email: support@infotact.in | Web: localhost:3000';
      }

      if (cmd === 'clear') {
        setLogs([]);
      } else {
        setLogs((prev) => [...prev, `guest@infotact:~$ ${input}`, reply]);
      }
      setInput('');
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className="bg-slate-950 text-emerald-400 font-mono p-4 rounded-xl shadow-lg border border-slate-800 text-sm h-64 flex flex-col justify-between cursor-text"
    >
      <div className="overflow-y-auto space-y-1 mb-2 max-h-48 flex-1 pointer-events-none">
        {logs.map((log, i) => (
          <p key={i} className={log.startsWith('guest@infotact:') ? "text-indigo-400" : "text-emerald-400"}>
            {log}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-slate-900 pt-2">
        <span className="text-indigo-400 font-bold select-none">guest@infotact:~$</span>
        <input 
          ref={inputRef}
          type="text" 
          name="terminal-input"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none border-none flex-1 text-emerald-400 focus:ring-0 w-full"
          aria-label="Terminal Command Input"
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
}