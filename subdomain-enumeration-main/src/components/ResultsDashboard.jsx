import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Search, Download, Filter, Eye, Copy, Check, RefreshCw, AlertCircle, CheckCircle2, XCircle, ShieldCheck, ArrowUpDown, FileSpreadsheet, FileCode, FileText 
} from 'lucide-react';
import { exportToCSV, exportToJSON, exportToPDF } from '../utils/export';

export default function ResultsDashboard({ scanData, onViewDetails, onNewScan }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [copiedSubdomain, setCopiedSubdomain] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  if (!scanData || !scanData.results) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="text-xl font-bold text-slate-100">No Scan Results Available</h3>
        <p className="text-slate-400 text-sm">Start a new subdomain scan to populate this dashboard.</p>
        <button
          onClick={onNewScan}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          Start New Scan
        </button>
      </div>
    );
  }

  const { targetDomain, scanDate, summary, results, isDemo } = scanData;

  // Filter & Search Logic
  const filteredResults = useMemo(() => {
    let list = [...results];

    // Filter tab
    if (activeFilter === 'Resolved') {
      list = list.filter(r => r.status === 'Resolved');
    } else if (activeFilter === 'Unresolved') {
      list = list.filter(r => r.status === 'Unresolved');
    } else if (activeFilter === 'DNS') {
      list = list.filter(r => r.discoveryMethod.includes('DNS'));
    } else if (activeFilter === 'Certificate Transparency') {
      list = list.filter(r => r.discoveryMethod.includes('Certificate'));
    } else if (activeFilter === 'Passive Discovery') {
      list = list.filter(r => r.discoveryMethod.includes('Passive'));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(r => 
        r.subdomain.toLowerCase().includes(q) || 
        (r.ip && r.ip.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.subdomain.localeCompare(b.subdomain));
    } else if (sortBy === 'status') {
      list.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortBy === 'discoveryMethod') {
      list.sort((a, b) => a.discoveryMethod.localeCompare(b.discoveryMethod));
    }

    return list;
  }, [results, activeFilter, searchQuery, sortBy]);

  // Chart Data Preparation
  const methodChartData = useMemo(() => {
    const counts = { 'DNS': 0, 'Certificate Transparency': 0, 'Passive Sources': 0 };
    results.forEach(r => {
      if (r.discoveryMethod.includes('DNS')) counts['DNS']++;
      else if (r.discoveryMethod.includes('Certificate')) counts['Certificate Transparency']++;
      else counts['Passive Sources']++;
    });
    return [
      { name: 'DNS', count: counts['DNS'], fill: '#06b6d4' },
      { name: 'Cert Transparency', count: counts['Certificate Transparency'], fill: '#8b5cf6' },
      { name: 'Passive Sources', count: counts['Passive Sources'], fill: '#10b981' }
    ];
  }, [results]);

  const resolutionChartData = useMemo(() => {
    const resolvedCount = results.filter(r => r.status === 'Resolved').length;
    const unresolvedCount = results.length - resolvedCount;
    return [
      { name: 'Resolved', value: resolvedCount, color: '#10b981' },
      { name: 'Unresolved', value: unresolvedCount, color: '#f43f5e' }
    ];
  }, [results]);

  const handleCopySubdomain = (subdomain) => {
    navigator.clipboard.writeText(subdomain);
    setCopiedSubdomain(subdomain);
    setTimeout(() => setCopiedSubdomain(null), 2000);
  };

  return (
    <div className="space-y-8 py-4">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-extrabold text-slate-100">
              Enumeration Results
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center space-x-1">
              <span>🟢 Completed</span>
            </span>
            {isDemo && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
                DEMO DATA – NO REAL SCANNING
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Target Domain: <span className="text-cyan-300 font-bold">{targetDomain}</span> | Executed: {new Date(scanDate).toLocaleTimeString()}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onNewScan}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Results</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-30 p-1.5 space-y-1 font-mono text-xs">
                <button
                  onClick={() => { exportToPDF(scanData); setShowExportMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-cyan-300 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>PDF Report</span>
                </button>
                <button
                  onClick={() => { exportToCSV(scanData); setShowExportMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-emerald-300 flex items-center space-x-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>CSV File</span>
                </button>
                <button
                  onClick={() => { exportToJSON(scanData); setShowExportMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-purple-300 flex items-center space-x-2"
                >
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span>JSON File</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <p className="text-[11px] font-mono text-slate-400 uppercase">Total Discovered</p>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">{summary.totalDiscovered}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <p className="text-[11px] font-mono text-slate-400 uppercase">Resolved</p>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">{summary.resolved}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <p className="text-[11px] font-mono text-slate-400 uppercase">Unresolved</p>
          <p className="text-2xl font-extrabold text-rose-400 font-mono">{summary.unresolved}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <p className="text-[11px] font-mono text-slate-400 uppercase">Unique Subdomains</p>
          <p className="text-2xl font-extrabold text-cyan-400 font-mono">{summary.uniqueSubdomains}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
          <p className="text-[11px] font-mono text-slate-400 uppercase">Scan Duration</p>
          <p className="text-2xl font-extrabold text-purple-400 font-mono">{scanData.durationSeconds || '2.4'}s</p>
        </div>

      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Discovery Methods Bar Chart */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            Discovery Methods Distribution
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {methodChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Status Donut Chart */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            Resolution Status Ratio
          </h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resolutionChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {resolutionChartData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Filter, Search & Table Container */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none font-mono text-xs">
            {['All', 'Resolved', 'Unresolved', 'DNS', 'Certificate Transparency', 'Passive Discovery'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search subdomains or IPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="alphabetical">Sort: Subdomain (A-Z)</option>
                <option value="status">Sort: Status</option>
                <option value="discoveryMethod">Sort: Discovery Method</option>
              </select>
            </div>
          </div>

        </div>

        {/* Counter readout */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/60 pt-4">
          <span>
            Showing <strong className="text-cyan-400">{filteredResults.length}</strong> of <strong className="text-slate-200">{results.length}</strong> results
          </span>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Subdomain</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">IP / Record</th>
                <th className="p-3.5">Discovery Method</th>
                <th className="p-3.5">First Seen</th>
                <th className="p-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No matching subdomains found for the selected filter or search query.
                  </td>
                </tr>
              ) : (
                filteredResults.map((item, idx) => {
                  const isResolved = item.status === 'Resolved';
                  return (
                    <tr key={idx} className="hover:bg-slate-900/60 transition-colors group">
                      
                      {/* Subdomain */}
                      <td className="p-3.5 font-bold text-cyan-300 flex items-center space-x-2">
                        <span>{item.subdomain}</span>
                        <button
                          onClick={() => handleCopySubdomain(item.subdomain)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-cyan-400 transition-opacity"
                          title="Copy subdomain"
                        >
                          {copiedSubdomain === item.subdomain ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        {isResolved ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold inline-flex items-center space-x-1">
                            <span>🟢 Resolved</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[11px] font-semibold inline-flex items-center space-x-1">
                            <span>🔴 Unresolved</span>
                          </span>
                        )}
                      </td>

                      {/* IP Record */}
                      <td className="p-3.5 text-slate-300">
                        {item.ip || 'N/A'}
                      </td>

                      {/* Discovery Method */}
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] border font-semibold ${
                          item.discoveryMethod.includes('DNS')
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            : item.discoveryMethod.includes('Certificate')
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {item.discoveryMethod}
                        </span>
                      </td>

                      {/* First Seen */}
                      <td className="p-3.5 text-slate-400">
                        {item.firstSeen || 'Today'}
                      </td>

                      {/* Action */}
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => onViewDetails(item)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
