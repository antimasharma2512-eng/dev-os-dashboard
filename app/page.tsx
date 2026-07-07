"use client";
import React, { useEffect, useState } from 'react';
import AnalyticsChart from './components/AnalyticsChart';
import TerminalConsole from './components/TerminalConsole';

export default function DashboardHome() {
  const [repoCount, setRepoCount] = useState<number | string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a real API fetch from a public organization profile
    fetch('https://api.github.com/users/facebook')
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos) {
          setRepoCount(data.public_repos);
        } else {
          setRepoCount(14); // Fallback standard stat if rate-limited
        }
        setLoading(false);
      })
      .catch(() => {
        setRepoCount(14); // Fallback safety
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pl-72 pr-8 pt-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Developer 👋</h1>
        <p className="text-slate-500">Here is your live engineering ecosystem preview.</p>
      </header>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Public Repositories</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {repoCount}
          </p>
          {loading && (
            <div className="absolute inset-0 bg-slate-100/50 animate-pulse flex items-center pl-6 font-medium text-slate-400 text-sm">
              Syncing live metrics...
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deployments</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">1 Active</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform Health</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">99.9%</p>
        </div>
      </div>

      {/* Interactive Display Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnalyticsChart />
        <TerminalConsole />
      </div>
    </main>
  );
}