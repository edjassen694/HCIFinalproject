import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

export default function CourseModal({ isOpen, onClose, onSave, editingCourse }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [sections, setSections] = useState('BSIT 1A–4D');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingCourse) {
      setCode(editingCourse.code || '');
      setName(editingCourse.name || '');
      setSections(editingCourse.sections || 'BSIT 1A–4D');
    } else {
      setCode('');
      setName('');
      setSections('BSIT 1A–4D');
    }
    setError('');
  }, [editingCourse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      setError('Please provide both course code and course name.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await onSave({ code: code.trim().toUpperCase(), name: name.trim(), sections: sections.trim() });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save course.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-scale-up">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {editingCourse ? 'Edit Course' : 'Add Course'}
              </h3>
              <p className="text-xs text-slate-500">
                {editingCourse ? 'Update course details and section coverage' : 'Add a new subject to the BSIT curriculum'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. HCI, PROG1, NET101"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition uppercase"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Human-Computer Interaction"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sections Covered
            </label>
            <input
              type="text"
              value={sections}
              onChange={(e) => setSections(e.target.value)}
              placeholder="e.g. BSIT 1A–4D"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] rounded-xl shadow-xs transition"
            >
              {saving ? 'Saving...' : editingCourse ? 'Update Course' : 'Save Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
