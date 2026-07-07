"use client";
import React, { useState } from 'react';
import { Wallet, Sparkles, TrendingUp, ListFilter } from 'lucide-react';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', category: 'Food', amount: 240.00, description: 'Dinner via Swiggy', date: 'Today' },
    { id: '2', category: 'Transport', amount: 80.00, description: 'Auto ride via Namma Yatri', date: 'Yesterday' }
  ]);
  
  const [aiInput, setAiInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setIsProcessing(true);

    // Simulate an AI LLM parsing Indian consumer text streams
    setTimeout(() => {
      let amount = 100.00; 
      let category = 'General';
      
      const moneyMatch = aiInput.match(/(?:₹|Rs\.?\s?)(\d+(\.\d{2})?)/i) || aiInput.match(/(\d+)\s?(?:rs|rupees)/i);
      if (moneyMatch) {
        amount = parseFloat(moneyMatch[1]);
      }

      const lowerInput = aiInput.toLowerCase();
      if (lowerInput.includes('swiggy') || lowerInput.includes('zomato') || lowerInput.includes('chai') || lowerInput.includes('food')) {
        category = 'Food';
      } else if (lowerInput.includes('auto') || lowerInput.includes('ola') || lowerInput.includes('uber') || lowerInput.includes('metro')) {
        category = 'Transport';
      } else if (lowerInput.includes('zepto') || lowerInput.includes('blinkit') || lowerInput.includes('instamart')) {
        category = 'Groceries';
      }

      const newExpense: Expense = {
        id: Date.now().toString(),
        category,
        amount,
        description: aiInput,
        date: 'Just now via UPI Stream'
      };

      setExpenses([newExpense, ...expenses]);
      setAiInput('');
      setIsProcessing(false);
    }, 800);
  };

  const totalSpent = expenses.reduce((sum, expenseItem) => sum + expenseItem.amount, 0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pl-72 pr-8 pt-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span>AI Expense Copilot</span> 
          <Sparkles className="text-yellow-500 h-7 w-7" />
        </h1>
        <p className="text-slate-500">Natural language processing ledger optimized for Indian consumer ecosystems.</p>
      </header>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-6 rounded-xl text-white shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Total Outflow</p>
          <p className="text-3xl font-bold mt-2">₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Parsing Status</p>
            <p className="text-lg font-bold text-slate-800 mt-1">UPI SMS Engine Active</p>
          </div>
          <Sparkles className="text-indigo-500 animate-pulse" size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Input Box */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
          <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Wallet size={18} className="text-indigo-500" />
            <span>Type UPI Transaction</span>
          </h2>
          <form onSubmit={handleAiSubmit} className="space-y-3">
            <input 
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="e.g., Paid ₹120 for Swiggy food delivery"
              className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 text-sm text-slate-800"
              disabled={isProcessing}
              aria-label="Natural Language Expense Input"
            />
            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-lg text-xs font-medium tracking-wide transition flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-yellow-400" />
              <span>{isProcessing ? 'Parsing UPI Log...' : 'Process Transaction'}</span>
            </button>
          </form>
          <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
            *Try entering phrases specifying tokens like &quot;Rs 500&quot; or native utilities like &quot;Zomato&quot; to see real-time stack separation.
          </p>
        </div>

        {/* Ledger Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <ListFilter size={18} className="text-indigo-500" />
              <span>Extracted Transaction Ledger</span>
            </h2>
          </div>

          <div className="space-y-3">
            {expenses.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-slate-200 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xs text-slate-600">
                    {item.category[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.description}</p>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-sm text-rose-600 flex items-center">
                  <TrendingUp size={14} className="inline mr-1" />
                  -₹{item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}