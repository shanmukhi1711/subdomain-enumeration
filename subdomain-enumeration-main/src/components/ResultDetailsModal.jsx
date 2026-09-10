import React, { useState } from 'react';
import { X, Globe, ShieldCheck, Info, Check, Copy, Server, FileText, Lock } from 'lucide-react';

export default function ResultDetailsModal({ item, onClose }) {
  if (!item) return null;

  const [activeRecordTab, setActiveRecordTab] = useState('A');
  const [copiedText, setCopiedText] = useState(false);

  const { subdomain, status, ip, records = {}, discoveryMethod, firstSeen, detailsExplanation } = item;
  const isResolved = status === 'Resolved';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Status */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
              Subdomain Inspection
            </span>
            {isResolved ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
                🟢 Resolved
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-semibold">
                🔴 Unresolved
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-cyan-300 font-mono tracking-tight break-all">
              {subdomain}
            </h3>
            <button
              onClick={() => handleCopy(subdomain)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Copy hostname"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Discovery Method Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-mono">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Discovery Source</span>
            </span>
            <span className="text-cyan-400 font-bold">{discoveryMethod}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed font-sans text-xs">
            <Info className="w-3.5 h-3.5 text-cyan-400 inline-block mr-1.5 -mt-0.5" />
            {detailsExplanation || 'This subdomain was identified using DNS lookups and public record analysis.'}
          </div>
        </div>

        {/* DNS Records Viewer Tabs */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center space-x-1.5">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span>DNS Records Information</span>
          </label>

          <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
            {recordTypes.map((type) => {
              const recList = records[type] || [];
              const hasRecords = recList.length > 0;
              return (
                <button
                  key={type}
                  onClick={() => setActiveRecordTab(type)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                    activeRecordTab === type
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{type}</span>
                  {hasRecords && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </button>
              );
            })}
          </div>

          {/* Record Display Content Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 min-h-[90px] flex items-center">
            {(() => {
              const currentRecords = records[activeRecordTab] || [];
              if (currentRecords.length === 0) {
                return (
                  <span className="text-slate-500 italic text-center w-full">
                    No {activeRecordTab} records associated with this subdomain.
                  </span>
                );
              }
              return (
                <ul className="space-y-1.5 w-full">
                  {currentRecords.map((r, i) => (
                    <li key={i} className="p-2 rounded bg-slate-900 border border-slate-800/80 flex items-center justify-between text-cyan-300 break-all">
                      <span>{r}</span>
                      <button
                        onClick={() => handleCopy(r)}
                        className="text-slate-500 hover:text-cyan-400 ml-2 shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>First Discovered: {firstSeen || 'Today'}</span>
          <span className="text-emerald-400 flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Authorized Scope</span>
          </span>
        </div>

      </div>
    </div>
  );
}
