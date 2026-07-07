"use client";
import React, { useState } from 'react';
import { MessageSquare, PlusCircle, Trash2, Globe } from 'lucide-react';

interface FeedbackItem {
  id: string;
  project: string;
  comment: string;
  timestamp: string;
}

export default function FeedbackSaaS() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([
    { id: '1', project: 'Dev Portfolio', comment: 'The interactive terminal component works smoothly!', timestamp: 'Just now' },
    { id: '2', project: 'Analytics Engine', comment: 'Contribution chart scales perfectly on mobile viewports.', timestamp: '2 hours ago' }
  ]);
  const [project, setProject] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.trim() || !comment.trim()) return;

    const newItem: FeedbackItem = {
      id: Date.now().toString(),
      project: project.trim(),
      comment: comment.trim(),
      timestamp: 'Just now'
    };

    setFeedbackList([newItem, ...feedbackList]);
    setProject('');
    setComment('');
  };

  const deleteFeedback = (id: string) => {
    setFeedbackList(feedbackList.filter(item => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pl-72 pr-8 pt-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quick-Review Hub 💬</h1>
        <p className="text-slate-500">A live Micro-SaaS ecosystem for collecting and aggregate platform user reviews.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side Column: Input Form Box */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-indigo-500" />
            <span>Submit New Review</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Name</label>
              <input 
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="e.g., Terminal Portfolio App"
                className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 text-sm text-slate-800"
                aria-label="Project Title Field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Review Comment</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your system feedback or critique here..."
                rows={4}
                className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 text-sm text-slate-800 resize-none"
                aria-label="Feedback Content Area"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-medium transition text-sm shadow-sm"
            >
              Post Live Metric Link
            </button>
          </form>
        </div>

        {/* Right Side Column: Live Review Streams */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-500" />
              <span>Incoming Feedback Feed</span>
            </h2>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1">
              <Globe size={12} /> Active Sync Listening
            </span>
          </div>

          {feedbackList.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-12">No responses received yet.</p>
          ) : (
            feedbackList.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start hover:border-slate-200 transition animate-fadeIn">
                <div>
                  <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 text-xs font-bold rounded-md">
                    {item.project}
                  </span>
                  <p className="text-slate-700 mt-3 text-sm leading-relaxed">{item.comment}</p>
                  <span className="text-xs text-slate-400 block mt-2">{item.timestamp}</span>
                </div>
                <button 
                  onClick={() => deleteFeedback(item.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition"
                  aria-label="Delete Notification Card"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}