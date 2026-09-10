import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, AlertCircle, Play, Sparkles, CheckSquare, Square, Info } from 'lucide-react';
import { validateDomain, normalizeDomain } from '../utils/validation';
import AdvancedOptionsAccordion from './AdvancedOptionsAccordion';

export default function EnumeratePage({ onStartScan, onTriggerDemo, defaultDomain = '' }) {
  const [domainInput, setDomainInput] = useState(defaultDomain);
  const [confirmedAuth, setConfirmedAuth] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [normalizedPreview, setNormalizedPreview] = useState('');
  const [options, setOptions] = useState({
    dnsRecordTypes: ['A', 'AAAA', 'CNAME', 'MX', 'TXT'],
    enableCT: true,
    enableDictionary: true,
    timeout: '4'
  });

  // Handle typing & dynamic validation check
  useEffect(() => {
    if (!domainInput.trim()) {
      setValidationError(null);
      setNormalizedPreview('');
      return;
    }

    const norm = normalizeDomain(domainInput);
    setNormalizedPreview(norm);

    // Show friendly hint if URL was pasted
    if (domainInput.includes('http://') || domainInput.includes('https://') || domainInput.includes('/')) {
      setValidationError({
        type: 'info',
        message: `URL detected! We automatically normalized it to "${norm}". Only the domain name is required.`
      });
    } else {
      const res = validateDomain(domainInput);
      if (!res.isValid) {
        setValidationError({
          type: 'error',
          message: res.message
        });
      } else {
        setValidationError(null);
      }
    }
  }, [domainInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = validateDomain(domainInput);
    if (!res.isValid) {
      setValidationError({
        type: 'error',
        message: res.message
      });
      return;
    }

    if (!confirmedAuth) {
      setValidationError({
        type: 'error',
        message: 'Please check the authorization box confirming you have permission to assess this domain.'
      });
      return;
    }

    onStartScan(res.domain, options, confirmedAuth);
  };

  const isButtonDisabled = !domainInput.trim() || !confirmedAuth || (validationError && validationError.type === 'error');

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Search className="w-3.5 h-3.5" />
          <span>Enumeration Engine Setup</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          Subdomain Enumeration
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Specify a domain you own or are authorized to assess to initiate automated passive and DNS discovery.
        </p>
      </div>

      {/* Main Input Form Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Large Domain Input */}
          <div className="space-y-2">
            <label htmlFor="target-domain-input" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Enter Target Domain
            </label>
            
            <div className="relative">
              <input
                id="target-domain-input"
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="example.com"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3.5 text-base font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <div className="absolute right-3 top-3.5 flex items-center space-x-2">
                {domainInput && (
                  <button
                    type="button"
                    onClick={() => setDomainInput('')}
                    className="text-xs text-slate-500 hover:text-slate-300 font-mono px-2 py-1 bg-slate-800 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Enter a domain you own or have explicit permission to assess.
            </p>
          </div>

          {/* Validation Feedback Messages */}
          {validationError && (
            <div className={`p-4 rounded-xl text-xs flex items-start space-x-3 ${
              validationError.type === 'error'
                ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
            }`}>
              {validationError.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">
                {validationError.message}
              </div>
            </div>
          )}

          {/* Authorization Checkbox */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <label className="flex items-start space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                id="auth-check"
                checked={confirmedAuth}
                onChange={(e) => setConfirmedAuth(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/40"
              />
              <span className="text-xs text-slate-200 leading-relaxed">
                <strong>I confirm that I own this domain or have explicit authorization to assess it.</strong>
                <span className="block text-slate-400 text-[11px] mt-0.5 font-mono">
                  Authorization is mandatory for all cybersecurity assessment tools.
                </span>
              </span>
            </label>
          </div>

          {/* Advanced Options Accordion */}
          <AdvancedOptionsAccordion options={options} setOptions={setOptions} />

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                isButtonDisabled
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  : 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01]'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Start Enumeration</span>
            </button>
          </div>

        </form>

        {/* Demo Callout */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Want to test without a live domain?</span>
          </div>

          <button
            type="button"
            onClick={onTriggerDemo}
            className="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-400/20" />
            <span>Try Demo (demo.example)</span>
          </button>
        </div>

      </div>

    </div>
  );
}
