import React from 'react';
import { Cpu, Server, Database, Globe, Shield, Terminal, ArrowDown, Layers } from 'lucide-react';

export default function ArchitecturePage() {
  const componentsList = [
    {
      title: 'User Interface',
      icon: Terminal,
      color: 'text-cyan-400 border-cyan-500/30',
      description: 'Modern React + Vite single page SaaS application providing domain input, progress animation, interactive dashboards, charts, and PDF export.'
    },
    {
      title: 'Input Validation',
      icon: Globe,
      color: 'text-teal-400 border-teal-500/30',
      description: 'Sanitizes domain input, normalizes pasted URLs (http/https), validates RFC syntax, and flags raw IP addresses before processing.'
    },
    {
      title: 'Authorization Confirmation',
      icon: Shield,
      color: 'text-emerald-400 border-emerald-500/30',
      description: 'Enforces legal scope validation. Rejects execution unless user checks authorization checkboxes and acknowledges ethical boundaries.'
    },
    {
      title: 'Enumeration Engine',
      icon: Cpu,
      color: 'text-purple-400 border-purple-500/30',
      description: 'Orchestrates passive public queries and active DNS resolution pipelines concurrently with rate limiting and timeout guards.'
    },
    {
      title: 'Passive Discovery & DNS Resolution',
      icon: Layers,
      color: 'text-indigo-400 border-indigo-500/30',
      description: 'Queries Certificate Transparency registries (crt.sh) passively while actively resolving hostnames against A, AAAA, CNAME, MX, and TXT records.'
    },
    {
      title: 'Result Processor & Database',
      icon: Database,
      color: 'text-amber-400 border-amber-500/30',
      description: 'Deduplicates candidate names, formats DNS record payloads, attaches status badges, and stores scan reports in memory and local storage.'
    },
    {
      title: 'Results Dashboard',
      icon: Server,
      color: 'text-cyan-400 border-cyan-500/30',
      description: 'Renders searchable tables, Recharts visualizations, DNS inspection drawers, and PDF/CSV/JSON export downloads.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>System Topology</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          Application System Architecture
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          High-level operational flow diagram illustrating the modular design of SubScope from user input to dashboard rendering.
        </p>
      </div>

      {/* ASCII / Interactive Flow Diagram */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-3">
          Architecture Flow Diagram
        </h3>

        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto shadow-inner text-center">
          <pre className="inline-block text-left text-[11px] sm:text-xs">
{`                User
                  |
                  v
          Web Application
                  |
                  v
          Input Validation
                  |
                  v
       Authorization Confirmation
                  |
                  v
       Enumeration Engine
          /            \\
         /              \\
Passive Discovery    DNS Resolution
         \\              /
          \\            /
           v          v
          Result Processor
                  |
                  v
          Results Database
                  |
                  v
           Results Dashboard`}
          </pre>
        </div>
      </div>

      {/* Component Explanations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-mono uppercase tracking-wider text-xs">
          Component Breakdown & Responsibilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {componentsList.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-lg bg-slate-950 border ${comp.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">{comp.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {comp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
