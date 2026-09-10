import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="font-extrabold text-slate-100 text-lg">SubScope</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              SubScope is an educational cybersecurity prototype engineered exclusively for authorized reconnaissance, attack-surface management, and educational learning.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Only scan domains you own or have explicit written permission to assess.</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('enumerate')} className="hover:text-cyan-400 transition-colors">
                  Domain Enumeration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('results')} className="hover:text-cyan-400 transition-colors">
                  Results Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-cyan-400 transition-colors">
                  Scan History Logs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Documentation & Ethics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-cyan-400 transition-colors">
                  How It Works Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('security')} className="hover:text-cyan-400 transition-colors">
                  Responsible Use & Ethics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('architecture')} className="hover:text-cyan-400 transition-colors">
                  System Architecture
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} SubScope Security Assessment Prototype. Educational & Authorized Use Only.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0 font-mono text-[10px]">
            <span className="text-emerald-400">STATUS: OPERATIONAL</span>
            <span className="text-slate-700">|</span>
            <span className="text-cyan-400">ENCRYPTION: ACTIVE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
