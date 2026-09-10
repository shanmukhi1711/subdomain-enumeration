import React from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

export default function AuthorizationModal({ isOpen, onClose, onConfirm, targetDomain }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Authorized Use Only</h3>
            <p className="text-xs text-slate-400 font-mono">Target: {targetDomain}</p>
          </div>
        </div>

        {/* Text */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Subdomain enumeration is a reconnaissance technique. Only scan domains that you own or have explicit permission to assess.
          </p>
          <p className="text-slate-400 font-mono text-[11px]">
            Unauthorized scanning of third-party infrastructure may violate legal terms and security policies.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I’m Authorized – Continue</span>
          </button>
        </div>

      </div>
    </div>
  );
}
