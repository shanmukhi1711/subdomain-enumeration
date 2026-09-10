import React, { useState, useEffect } from 'react';
import { History, Eye, Trash2, Download, AlertCircle, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { getStoredScans, deleteScanFromStorage, clearAllScanHistory } from '../utils/storage';
import { exportToPDF } from '../utils/export';

export default function ScanHistoryPage({ onLoadScan, onStartNewScan }) {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    setScans(getStoredScans());
  }, []);

  const handleDelete = (id) => {
    const updated = deleteScanFromStorage(id);
    setScans(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored scan history?')) {
      clearAllScanHistory();
      setScans([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Audit & Scan Records</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Scan History
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Review, re-examine, and export previously executed authorized domain scans.
          </p>
        </div>

        {scans.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-semibold transition-all flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History Table Container */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
        
        {scans.length === 0 ? (
          <div className="py-12 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No Historical Scans Found</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              You haven't run any subdomain enumeration scans yet. Initiate a scan on your authorized domain.
            </p>
            <button
              onClick={onStartNewScan}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              Start First Scan
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Domain</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Results</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300">
                {scans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-slate-900/60 transition-colors">
                    
                    <td className="p-3.5 font-bold text-cyan-300">
                      {scan.targetDomain}
                      {scan.isDemo && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px]">
                          DEMO
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-slate-400">
                      {new Date(scan.scanDate).toLocaleDateString()} {new Date(scan.scanDate).toLocaleTimeString()}
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-slate-200">
                        {scan.summary ? scan.summary.totalDiscovered : (scan.results ? scan.results.length : 0)}
                      </span> subdomains
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                        Completed
                      </span>
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onLoadScan(scan)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold text-xs inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => exportToPDF(scan)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs inline-flex items-center space-x-1"
                        title="Export PDF Report"
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-400" />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => handleDelete(scan.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors inline-flex items-center"
                        title="Delete scan record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
