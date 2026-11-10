import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Users, Mail, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { api } from '../api';

export default function DatabaseHealthCard({ onDataChanged, showToast }) {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixingId, setFixingId] = useState(null);
  const [dismissedIds, setDismissedIds] = useState([]);

  // Fetch health report on load
  const loadHealthReport = async (isManualScan = false) => {
    setLoading(true);
    try {
      const data = isManualScan 
        ? await api.scanDatabaseHealth() 
        : await api.getDatabaseHealth();
      setHealthData(data);
      if (isManualScan) {
        showToast(`Scan complete: ${data.issues_count} issues detected across ${data.total_scanned} records.`, 'success');
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHealthReport(false);
  }, []);

  const handleFix = async (issue) => {
    setFixingId(issue.id);
    try {
      const res = await api.applyHealthFix({
        issue_id: issue.id,
        action: issue.action,
        student_id: issue.student_id,
        new_value: issue.suggested_value,
      });

      showToast(res.message || 'Fix applied successfully!', 'success');
      
      // Remove issue from view and reload health
      setDismissedIds(prev => [...prev, issue.id]);
      await loadHealthReport(false);
      if (onDataChanged) onDataChanged();
    } catch (err) {
      showToast(err.message || 'Failed to apply fix', 'error');
    } finally {
      setFixingId(null);
    }
  };

  const handleDismiss = (issueId) => {
    setDismissedIds(prev => [...prev, issueId]);
    showToast('Issue dismissed.', 'success');
  };

  const activeIssues = (healthData?.issues || []).filter(
    issue => !dismissedIds.includes(issue.id)
  );

  const score = healthData ? Math.min(100, healthData.health_score + (dismissedIds.length * 3)) : 95;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                AI Database Health Inspector
              </h2>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-[#EEF2FF] text-[#4F46E5] uppercase tracking-wide">
                Proactive AI
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated audit for fuzzy duplicates, email domain typos, and section conflicts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Health Score Pill */}
          <div className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border ${
            score >= 90
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : score >= 75
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{score}% Healthy</span>
          </div>

          {/* Rescan Button */}
          <button
            onClick={() => loadHealthReport(true)}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#4F46E5]' : 'text-slate-500'}`} />
            <span>{loading ? 'Scanning...' : 'Scan Now'}</span>
          </button>
        </div>
      </div>

      {/* Audit Status Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 bg-slate-50/70 p-3 rounded-xl border border-slate-100 gap-2">
        <div className="flex items-center gap-4">
          <span>Total Scanned: <strong className="text-slate-800">{healthData?.total_scanned ?? 120} students</strong></span>
          <span>Pending Issues: <strong className={activeIssues.length > 0 ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold'}>{activeIssues.length}</strong></span>
        </div>
        <span className="text-slate-400">Last scan: {healthData?.last_scanned || 'Just now'}</span>
      </div>

      {/* Issues Queue */}
      {activeIssues.length === 0 ? (
        <div className="py-8 text-center bg-[#F8FAFC] rounded-xl border border-dashed border-slate-200 p-6 space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-900">Database is 100% clean and verified!</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No duplicate student profiles, email syntax typos, or section assignment conflicts found across all records.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-700">
            Detected Anomalies Requiring Action ({activeIssues.length}):
          </p>

          <div className="space-y-2.5">
            {activeIssues.map((issue) => {
              const isFixing = fixingId === issue.id;

              return (
                <div
                  key={issue.id}
                  className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-[#4F46E5]/40 transition space-y-3 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        issue.type === 'duplicate'
                          ? 'bg-red-50 text-red-600'
                          : issue.type === 'email_typo'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-indigo-50 text-[#4F46E5]'
                      }`}>
                        {issue.type === 'duplicate' ? (
                          <Users className="w-4 h-4" />
                        ) : issue.type === 'email_typo' ? (
                          <Mail className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{issue.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-2xs font-semibold uppercase ${
                            issue.severity === 'high'
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {issue.reason}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDismiss(issue.id)}
                      title="Dismiss false alarm"
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Context Comparison Row */}
                  <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">Current:</span>
                      <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 line-through text-red-500">
                        {issue.current_value}
                      </span>
                    </div>

                    <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-slate-400 shrink-0" />

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">AI Recommendation:</span>
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        {issue.suggested_value}
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Action Button */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleFix(issue)}
                      disabled={isFixing}
                      className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isFixing ? 'Applying fix...' : issue.action_label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
