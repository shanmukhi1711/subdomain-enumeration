import React from 'react';
import { Search, Shield, BarChart3, ArrowRight, Play, CheckCircle2, Lock, Cpu, Database, Eye } from 'lucide-react';

export default function LandingPage({ setActiveTab, onTriggerDemo }) {
  const featureCards = [
    {
      icon: Search,
      title: 'Discover',
      emoji: '🔎',
      description: 'Identify publicly exposed subdomains via DNS queries and Certificate Transparency logs.',
      badge: 'Passive & DNS',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30'
    },
    {
      icon: Shield,
      title: 'Authorized',
      emoji: '🛡️',
      description: 'Designed exclusively for permitted security assessments, CTF labs, and owned infrastructure.',
      badge: 'Strict Ethics',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
    },
    {
      icon: BarChart3,
      title: 'Analyze',
      emoji: '📊',
      description: 'Review and organize discovered results with rich charts, DNS inspection, and PDF reporting.',
      badge: 'Visual Analytics',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30'
    }
  ];

  return (
    <div className="space-y-16 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Authorized Security Assessment Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100">
            <span className="bg-gradient-to-r from-slate-100 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              SubScope
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono tracking-tight">
            Authorized Subdomain Enumeration & Security Discovery
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Discover publicly identifiable subdomains of domains you own or are explicitly authorized to assess. Built as an educational prototype for understanding reconnaissance and attack-surface discovery.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('enumerate')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Enumeration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('how-it-works')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center justify-center space-x-2"
            >
              <span>How It Works</span>
              <BookOpenIcon />
            </button>

            <button
              onClick={onTriggerDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono font-semibold text-sm border border-emerald-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>Try Demo</span>
            </button>
          </div>

          {/* Key Security Promises */}
          <div className="pt-8 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Standard DNS Lookups</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Certificate Transparency</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Non-Intrusive & Passive</span>
            </div>
          </div>

        </div>
      </section>

      {/* Three Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-b ${card.color} bg-slate-900/80 border transition-all duration-300 hover:-translate-y-1 shadow-xl space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{card.emoji}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-400 border border-slate-800 font-semibold">
                  {card.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                <span>{card.title}</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Interactive Quick Preview Widget */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>Interactive Dashboard Preview</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Sample output from a simulated scan on <code className="text-cyan-300 font-mono">demo.example</code>
            </p>
          </div>

          <button
            onClick={onTriggerDemo}
            className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold transition-all"
          >
            Launch Full Interactive Demo
          </button>
        </div>

        {/* Mini Preview Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Subdomain</th>
                <th className="p-3">Status</th>
                <th className="p-3">IP / Record</th>
                <th className="p-3">Discovery Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-cyan-300">www.demo.example</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">🟢 Resolved</span></td>
                <td className="p-3 text-slate-400">192.0.2.10</td>
                <td className="p-3"><span className="text-cyan-400">DNS Resolution</span></td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-cyan-300">api.demo.example</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">🟢 Resolved</span></td>
                <td className="p-3 text-slate-400">192.0.2.25</td>
                <td className="p-3"><span className="text-cyan-400">DNS Resolution</span></td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-cyan-300">portal.demo.example</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">🟢 Resolved</span></td>
                <td className="p-3 text-slate-400">192.0.2.88</td>
                <td className="p-3"><span className="text-purple-400">Certificate Transparency</span></td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-cyan-300">grafana.demo.example</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">🔴 Unresolved</span></td>
                <td className="p-3 text-slate-500">N/A</td>
                <td className="p-3"><span className="text-purple-400">Certificate Transparency</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

function BookOpenIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
