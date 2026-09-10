import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Lock, AlertTriangle, FileCheck } from 'lucide-react';

export default function SecurityEthicsPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Security & Ethics Guidelines</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          Responsible Use & Ethical Boundaries
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Cybersecurity tools must always be operated with strict authorization, compliance, and respect for privacy and laws.
        </p>
      </div>

      {/* Prominent Disclaimer Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100">
              Responsible Use Policy
            </h3>
            <blockquote className="text-sm font-medium text-amber-200 italic border-l-2 border-amber-400 pl-3 py-1">
              "Only perform enumeration against systems you own or have explicit permission to assess."
            </blockquote>
            <p className="text-xs text-slate-300 leading-relaxed">
              SubScope is engineered exclusively as an <strong>educational cybersecurity prototype</strong> for understanding reconnaissance concepts, asset discovery, and defense posture mapping.
            </p>
          </div>
        </div>
      </div>

      {/* Allowed vs Not Allowed Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Allowed Use Cases */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
              Allowed Use Cases
            </h3>
          </div>

          <ul className="space-y-3 text-xs text-slate-300 font-medium">
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Your Own Domains:</strong> Infrastructure and domains registered directly under your ownership.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Lab & Sandbox Environments:</strong> Dedicated security lab targets designed for testing.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Permitted CTF Challenges:</strong> Capture-The-Flag events where domain scanning is explicitly authorized.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Authorized Penetration Tests:</strong> Security audits backed by formal Rules of Engagement (RoE).</span>
            </li>
          </ul>
        </div>

        {/* Not Allowed Use Cases */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <XCircle className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
              Not Allowed (Prohibited)
            </h3>
          </div>

          <ul className="space-y-3 text-xs text-slate-300 font-medium">
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Random Websites:</strong> Scanning arbitrary third-party targets without explicit consent.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Third-Party Infrastructure:</strong> Cloud resources or SaaS vendors lacking written permission.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Government or Enterprise Systems:</strong> Regulated, municipal, or corporate infrastructure without authorization.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Malicious Intent:</strong> Pre-attack probing, harassment, or unauthorized vulnerability searching.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Safety Commitment Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-center">
        <FileCheck className="w-8 h-8 text-cyan-400 mx-auto" />
        <h4 className="text-lg font-bold text-slate-100">
          Safety & Non-Exploitation Guarantee
        </h4>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
          SubScope strictly excludes features designed for stealth, evasion, security control bypassing, credential brute-forcing, exploitation, or unauthorized intrusion. All discovery techniques are limited to standard DNS lookups and public Certificate Transparency records.
        </p>
      </div>

    </div>
  );
}
