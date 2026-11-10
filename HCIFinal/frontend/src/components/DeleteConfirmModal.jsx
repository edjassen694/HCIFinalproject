import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, title, message, onConfirm, onCancel, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all animate-scale-up">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{title || 'Confirm Deletion'}</h3>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              {message || 'Are you sure you want to delete this record? This action cannot be undone.'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-xs transition flex items-center gap-2"
          >
            {isDeleting ? 'Deleting...' : 'Delete Record'}
          </button>
        </div>
      </div>
    </div>
  );
}
