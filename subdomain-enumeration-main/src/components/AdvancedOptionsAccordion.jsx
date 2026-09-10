import React, { useState } from 'react';
import { Sliders, ChevronDown, Check, Globe, Shield, Clock, Hash } from 'lucide-react';

export default function AdvancedOptionsAccordion({ options, setOptions }) {
  const [isOpen, setIsOpen] = useState(false);

  const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT'];

  const toggleRecordType = (type) => {
    const current = options.dnsRecordTypes || recordTypes;
    if (current.includes(type)) {
      if (current.length === 1) return; // keep at least one
      setOptions({ ...options, dnsRecordTypes: current.filter(t => t !== type) });
    } else {
      setOptions({ ...options, dnsRecordTypes: [...current, type] });
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800 transition-all overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center space-x-2.5">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold font-mono text-slate-200 uppercase tracking-wider">
            Advanced Scan Options
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            (Optional Configuration)
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-5 border-t border-slate-800/80 space-y-5 bg-slate-950/40 text-xs">
          
          {/* DNS Record Types */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2 font-mono flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target DNS Record Types</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {recordTypes.map((type) => {
                const isSelected = (options.dnsRecordTypes || recordTypes).includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleRecordType(type)}
                    className={`px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs flex items-center space-x-1.5 transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discovery Sources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-2 font-mono flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Discovery Techniques</span>
              </label>
              <div className="space-y-2 font-mono">
                <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.enableCT !== false}
                    onChange={(e) => setOptions({ ...options, enableCT: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/40"
                  />
                  <span>Certificate Transparency (crt.sh)</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.enableDictionary !== false}
                    onChange={(e) => setOptions({ ...options, enableDictionary: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/40"
                  />
                  <span>DNS Wordlist Candidate Lookup</span>
                </label>
              </div>
            </div>

            {/* Timeout settings */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2 font-mono flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Query Timeout (Seconds)</span>
              </label>
              <select
                value={options.timeout || '4'}
                onChange={(e) => setOptions({ ...options, timeout: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="2">2 seconds (Fastest)</option>
                <option value="4">4 seconds (Balanced)</option>
                <option value="8">8 seconds (Thorough)</option>
              </select>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
