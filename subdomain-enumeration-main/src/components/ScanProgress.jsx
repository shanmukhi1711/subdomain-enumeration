import React, { useEffect, useState } from 'react';
import { Shield, Loader2, XCircle, CheckCircle2, Activity, Terminal } from 'lucide-react';

export default function ScanProgress({ targetDomain, onCancel, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logs, setLogs] = useState([]);

  const steps = [
    'Validating target...',
    'Preparing enumeration engine...',
    'Querying Certificate Transparency logs...',
    'Checking candidate subdomains...',
    'Resolving discovered names via DNS...',
    'Collecting DNS records (A, AAAA, CNAME, MX, TXT)...',
    'Finalizing security report...'
  ];

  useEffect(() => {
    let interval = null;
    let currentPct = 0;

    interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 8) + 4;
      
      if (currentPct >= 100) {
        currentPct = 100;
        setProgress(100);
        setCurrentStepIndex(steps.length - 1);
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        setProgress(currentPct);
        const stepIdx = Math.min(
          Math.floor((currentPct / 100) * steps.length),
          steps.length - 1
        );
        setCurrentStepIndex(stepIdx);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  // Update logs when step changes
  useEffect(() => {
    const stepMsg = steps[currentStepIndex];
    if (stepMsg && !logs.includes(stepMsg)) {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${stepMsg}`]);
    }
  }, [currentStepIndex]);

  // Generate ASCII progress bar
  const totalBlocks = 16;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Scanning Target Domain</span>
          </div>

          <h3 className="text-xl font-bold text-slate-100 font-mono">
            Enumerating
          </h3>
          <p className="text-2xl font-extrabold text-cyan-400 font-mono tracking-tight">
            {targetDomain}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Progress Status</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          {/* Graphical Bar */}
          <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* ASCII Progress Bar Display */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-cyan-400 tracking-wider">
            {asciiBar} {progress}%
          </div>
        </div>

        {/* Live Terminal Log Box */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-left font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-900">
            <div className="flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Log Output</span>
            </div>
            <span className="text-emerald-400">ACTIVE</span>
          </div>

          <div className="h-32 overflow-y-auto space-y-1.5 scrollbar-thin text-slate-300">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-cyan-500">›</span>
                <span className="text-slate-300">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Scan Button */}
        <div className="pt-2">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-semibold transition-all flex items-center justify-center space-x-2 mx-auto"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel Scan</span>
          </button>
        </div>

      </div>

    </div>
  );
}
