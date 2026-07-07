import Link from 'next/link';
import { LayoutDashboard, Briefcase, Code } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6 fixed left-0 top-0 flex flex-col justify-between z-50">
      <div>
        <h2 className="text-xl font-bold mb-8 tracking-wider text-indigo-400">DEV.OS</h2>
        <nav className="space-y-4">
          <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <LayoutDashboard size={20} /> 
            <span>Dashboard</span>
          </Link>
          <Link href="/feedback" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
         <Briefcase size={20} /> 
         <span>Micro-SaaS App</span>
          </Link>
          <Link href="/tracker" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
          <Code size={20} className="text-yellow-400" /> 
          <span>AI Tracker App</span>
         </Link>
         <Link href="/kanban" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
         <Code size={20} className="text-indigo-400" /> 
         <span>Kanban Board</span>
         </Link>
        </nav>
      </div>
      <div className="border-t border-slate-800 pt-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 p-2 text-slate-400 hover:text-white transition"
        >
          <Code size={20} />
          <span>GitHub Profile</span>
        </a>
      </div>
    </aside>
  );
}