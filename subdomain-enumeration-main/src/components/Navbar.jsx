import React from 'react';
import { Shield, Play, History, BookOpen, ShieldAlert, Cpu, Search, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode, onTriggerDemo }) {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Shield },
    { id: 'enumerate', label: 'Enumerate', icon: Search },
    { id: 'results', label: 'Results', icon: Play },
    { id: 'history', label: 'Scan History', icon: History },
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
    { id: 'security', label: 'Security & Ethics', icon: ShieldAlert },
    { id: 'architecture', label: 'Architecture', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-100 via-cyan-200 to-teal-400 bg-clip-text text-transparent">
                  SubScope
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold tracking-wide uppercase">
                  v1.0 Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-none hidden sm:block">
                Authorized Reconnaissance Prototype
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onTriggerDemo}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-emerald-500/20"
              title="Instantly run simulated demo scan"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              <span>Try Demo</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-800/60 overflow-x-auto space-x-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
