"use client";
import React, { useState, useEffect } from 'react';
import { Layers, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'progress' | 'done';
}

export default function KanbanBoard() {
  // Safe LocalStorage Initializer Pattern (Bypasses ESLint rule perfectly)
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('infotact_kanban_tasks');
      if (savedTasks) {
        try {
          return JSON.parse(savedTasks);
        } catch (e) {
          console.error("Error parsing localStorage tasks", e);
        }
      }
    }
    return [
      { id: '1', title: 'Fix razorpay payment gateway integration webhook', status: 'done' },
      { id: '2', title: 'Optimize loading speeds for tier-2/tier-3 city networks', status: 'progress' },
      { id: '3', title: 'Design localization high-fidelity wireframes', status: 'todo' },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Synchronization effect to save updates
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('infotact_kanban_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const moveTask = (taskId: string, newStatus: 'todo' | 'progress' | 'done') => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pl-72 pr-8 pt-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span>Sprint Kanban Desk</span>
          <Layers className="text-indigo-600 h-7 w-7" />
        </h1>
        <p className="text-slate-500">Track local product feature rollouts and infrastructure updates.</p>
      </header>

      <form onSubmit={addTask} className="mb-8 max-w-md flex gap-2">
        <input 
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new sprint target item..."
          className="flex-1 p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg text-xs font-semibold flex items-center gap-1 transition">
          <Plus size={14} /> Add Item
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Changed min-h-[400px] to standard tailwind class min-h-96 */}
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200/60 min-h-96">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
            <AlertCircle size={14} className="text-rose-500" /> Backlog / Todo
          </h2>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'todo').map(task => (
              <div key={task.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/40">
                <p className="text-xs font-medium text-slate-800 leading-relaxed mb-3">{task.title}</p>
                <button type="button" onClick={() => moveTask(task.id, 'progress')} className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-1 rounded hover:bg-indigo-100 transition">
                  Start Track ➡️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Changed min-h-[400px] to standard tailwind class min-h-96 */}
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200/60 min-h-96">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
            <Clock size={14} className="text-amber-500" /> Active Progress
          </h2>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'progress').map(task => (
              <div key={task.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/40">
                <p className="text-xs font-medium text-slate-800 leading-relaxed mb-3">{task.title}</p>
                <button type="button" onClick={() => moveTask(task.id, 'done')} className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-1 rounded hover:bg-emerald-100 transition">
                  Resolve Deployment ✅
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Changed min-h-[400px] to standard tailwind class min-h-96 */}
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200/60 min-h-96">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
            <CheckCircle size={14} className="text-emerald-500" /> Shipped / Production
          </h2>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'done').map(task => (
              <div key={task.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/40 opacity-80">
                <p className="text-xs font-medium text-slate-500 line-through leading-relaxed mb-2">{task.title}</p>
                <span className="text-[9px] bg-slate-100 text-slate-400 font-semibold px-2 py-0.5 rounded">Persistent Asset Saved</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}