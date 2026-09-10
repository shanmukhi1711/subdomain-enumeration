import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Shield, Search, Cpu, Database, BarChart3, Lock, ArrowRight, ChevronRight } from 'lucide-react';

export default function HowItWorksPage() {
  const [activeStage, setActiveStage] = useState(0);

  const pipelineStages = [
    {
      title: 'Target Domain',
      subtitle: 'Input Specification',
      icon: Search,
      badge: 'Step 1',
      description: 'The user provides the target root domain name (e.g. example.com). Only the domain name is needed.',
      details: 'SubScope accepts root domains or normalizes URLs automatically. No path, query parameters, or protocols are needed for subdomain discovery.',
      techNote: 'Input normalization strips http://, https://, trailing slashes, and port numbers.'
    },
    {
      title: 'Input Validation',
      subtitle: 'Syntax & Safety Check',
      icon: CheckCircle2,
      badge: 'Step 2',
      description: 'The system validates that the entered text matches valid domain syntax and is not an IP address or empty field.',
      details: 'Friendly feedback alerts the user if syntax errors, IP addresses, or malformed characters are present without exposing server stack traces.',
      techNote: 'Uses RFC domain regex validation and IPv4/IPv6 address detection.'
    },
    {
      title: 'Authorization Check',
      subtitle: 'Legal & Ethical Scope',
      icon: Shield,
      badge: 'Step 3',
      description: 'The user explicitly confirms ownership or written authorization before any reconnaissance queries are executed.',
      details: 'Security controls enforce authorization checks. Scans cannot start until the legal confirmation checkbox and modal are confirmed.',
      techNote: 'Ensures compliance with ethical cybersecurity guidelines and computer fraud laws.'
    },
    {
      title: 'Passive Discovery',
      subtitle: 'Public Data Mining',
      icon: Database,
      badge: 'Step 4',
      description: 'Queries public databases such as Certificate Transparency (CT) logs to gather subdomains without touching target servers directly.',
      details: 'Passive enumeration relies on publicly indexed metadata (SSL/TLS certificates, search indices) without sending direct traffic to the target.',
      techNote: 'Uses public REST endpoints like crt.sh to extract Subject Alternative Names (SANs).'
    },
    {
      title: 'DNS Resolution',
      subtitle: 'Active Verification',
      icon: Cpu,
      badge: 'Step 5',
      description: 'Performs active DNS lookups for candidate subdomains to test whether hostnames currently resolve to IP addresses.',
      details: 'Evaluates DNS record types including A, AAAA, CNAME, MX, and TXT to map out active infrastructure elements.',
      techNote: 'Queries system/public DNS resolvers non-intrusively with rate-limiting.'
    },
    {
      title: 'Result Processing',
      subtitle: 'Data Aggregation',
      icon: Lock,
      badge: 'Step 6',
      description: 'Consolidates discovered hostnames, deduplicates entries, assigns status badges (Resolved vs Unresolved), and builds metadata.',
      details: 'Every discovered entry is tagged with its primary discovery technique and accompanied by an educational explanation.',
      techNote: 'Constructs structured JSON objects containing complete DNS record arrays.'
    },
    {
      title: 'Results Dashboard',
      subtitle: 'Visual Analytics',
      icon: BarChart3,
      badge: 'Step 7',
      description: 'Renders searchable tables, filter tabs, summary metrics, and visual pie/bar charts for security analysis.',
      details: 'Security teams can filter results by discovery source, copy IP addresses, view detailed DNS records, and export PDF reports.',
      techNote: 'Interactive React components paired with Recharts and jsPDF export motors.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Pipeline</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          How Subdomain Enumeration Works
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Step-by-step breakdown of how SubScope safely discovers and analyzes subdomains using passive intelligence and active DNS resolution.
        </p>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-3">
          Enumeration Pipeline Diagram (Click stage to inspect)
        </h3>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`p-3 rounded-xl border font-mono text-left transition-all relative flex flex-col items-center justify-between text-center ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-105 z-10'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 mb-2">
                  {stage.badge}
                </span>
                <Icon className={`w-5 h-5 my-1 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="text-[11px] font-bold line-clamp-2 leading-tight mt-1">
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                {React.createElement(pipelineStages[activeStage].icon, { className: "w-5 h-5 text-cyan-400" })}
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  {pipelineStages[activeStage].badge} Details
                </span>
                <h4 className="text-lg font-bold text-slate-100">
                  {pipelineStages[activeStage].title} – {pipelineStages[activeStage].subtitle}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={activeStage === 0}
                onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-30"
              >
                Prev
              </button>
              <button
                disabled={activeStage === pipelineStages.length - 1}
                onClick={() => setActiveStage(prev => Math.min(pipelineStages.length - 1, prev + 1))}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-cyan-400 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>

          <p className="text-slate-200 text-sm leading-relaxed">
            {pipelineStages[activeStage].description}
          </p>

          <p className="text-slate-400 text-xs leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80">
            {pipelineStages[activeStage].details}
          </p>

          <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-900/60 text-xs font-mono text-cyan-300">
            <strong className="text-cyan-400">Technical Note: </strong>
            {pipelineStages[activeStage].techNote}
          </div>
        </div>

      </div>

      {/* Educational FAQ / Explanation Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>What is Subdomain Enumeration?</span>
        </h3>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Subdomain enumeration is the reconnaissance process of finding valid subdomains linked to a target root domain (e.g. <code className="text-cyan-300 font-mono">example.com</code>).
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-cyan-300">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">www.example.com</div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">api.example.com</div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">mail.example.com</div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">portal.example.com</div>
          </div>

          <h4 className="text-base font-bold text-slate-100 pt-4">Why Security Teams Perform Subdomain Enumeration:</h4>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Understand Attack Surface:</strong> Identify external entry points accessible to public users or attackers.</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Identify Forgotten Services:</strong> Find unmaintained staging, legacy, or test environments.</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Improve Asset Inventory:</strong> Keep enterprise asset catalogs updated across cloud providers.</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Prevent Subdomain Takeover:</strong> Discover CNAME entries pointing to deleted cloud buckets or services.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
