"use client";
import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'progress' | 'done';
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
   { id: '1', title: 'Fix razorpay payment gateway integration webhook', status: 'done' },
   { id: '2', title: 'Optimize loading speeds for tier-2/tier-3 city networks', status: 'progress' },
   { id: '3', title: 'Design localization high-fidelity wireframes', status: 'todo' },]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: 'todo'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const moveTask = (id: string, currentStatus: 'todo' | 'progress' | 'done') => {
    const nextStatusMap: Record<string, 'todo' | 'progress' | 'done'> = {
      todo: 'progress',
      progress: 'done',
      done: 'todo'
    };
    setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatusMap[currentStatus] } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const columns: { id: 'todo' | 'progress' | 'done'; title: string; color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-100 text-slate-800' },
    { id: 'progress', title: 'In Progress', color: 'bg-amber-50 text-amber-800' },
    { id: 'done', title: 'Completed', color: 'bg-emerald-50 text-emerald-800' }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pl-72 pr-8 pt-8 pb-12">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Workspace Kanban 📋</h1>
          <p className="text-slate-500">Track task cycles, sprints, and project milestones live.</p>
        </div>
      </header>

      {/* Task Creation Inline Form */}
      <form onSubmit={addTask} className="mb-8 flex gap-2 max-w-md">
        <input 
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-indigo-500 text-sm"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg flex items-center justify-center" title="Add Task">
          <Plus size={18} />
        </button>
      </form>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-125">
        {columns.map(col => (
          <div key={col.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${col.color}`}>
                {col.title}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="p-4 bg-slate-50 border border-slate-100 rounded-lg shadow-2xs hover:border-slate-200 transition flex justify-between items-center group">
                  <p className="text-sm font-medium text-slate-700">{task.title}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button 
                      onClick={() => moveTask(task.id, task.status)}
                      className="p-1 text-slate-400 hover:text-indigo-600 transition"
                      aria-label="Move task to next phase"
                      title="Move Task"
                    >
                      <ArrowRight size={14} />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      aria-label="Delete task card"
                      title="Delete Task"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}