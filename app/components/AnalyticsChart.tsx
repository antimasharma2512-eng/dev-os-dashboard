"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', Commits: 4 },
  { name: 'Tue', Commits: 8 },
  { name: 'Wed', Commits: 5 },
  { name: 'Thu', Commits: 12 },
  { name: 'Fri', Commits: 9 },
  { name: 'Sat', Commits: 2 },
  { name: 'Sun', Commits: 6 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-80">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Contribution Velocity</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="Commits" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}