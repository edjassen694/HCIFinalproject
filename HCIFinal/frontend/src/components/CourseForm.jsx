import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function CourseForm({ courseToEdit, onCancel, onSaved, showToast }) {
  const isEdit = Boolean(courseToEdit);

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [program, setProgram] = useState('BSIT');
  const [selectedSections, setSelectedSections] = useState([
    '1A', '1B', '1C', '1D',
    '2A', '2B', '2C', '2D',
    '3A', '3B', '3C', '3D',
    '4A', '4B', '4C', '4D',
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseToEdit) {
      setCode(courseToEdit.code || '');
      setName(courseToEdit.name || '');
      setProgram('BSIT');
      // If course has specific sections, split or default
      if (courseToEdit.sections && courseToEdit.sections !== 'BSIT 1A–4D') {
        const parts = courseToEdit.sections.split(',').map(s => s.trim());
        setSelectedSections(parts);
      } else {
        setSelectedSections([
          '1A', '1B', '1C', '1D',
          '2A', '2B', '2C', '2D',
          '3A', '3B', '3C', '3D',
          '4A', '4B', '4C', '4D',
        ]);
      }
    } else {
      setCode('');
      setName('');
      setProgram('BSIT');
      setSelectedSections([
        '1A', '1B', '1C', '1D',
        '2A', '2B', '2C', '2D',
        '3A', '3B', '3C', '3D',
        '4A', '4B', '4C', '4D',
      ]);
    }
    setError('');
  }, [courseToEdit]);

  const toggleSection = (sec) => {
    if (selectedSections.includes(sec)) {
      setSelectedSections(selectedSections.filter(s => s !== sec));
    } else {
      setSelectedSections([...selectedSections, sec]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      setError('Please provide course code and course name.');
      return;
    }

    setSaving(true);
    setError('');

    const sectionsSummary = selectedSections.length === 16 
      ? 'BSIT 1A–4D' 
      : selectedSections.sort().join(', ');

    try {
      await onSaved({
        code: code.trim().toUpperCase(),
        name: name.trim(),
        sections: sectionsSummary || 'BSIT 1A–4D',
      });
      showToast(isEdit ? 'Course updated successfully!' : 'Course added successfully!', 'success');
      onCancel();
    } catch (err) {
      setError(err.message || 'Failed to save course.');
    } finally {
      setSaving(false);
    }
  };

  const sectionsByYear = {
    'BSIT · 1st year': ['1A', '1B', '1C', '1D'],
    'BSIT · 2nd year': ['2A', '2B', '2C', '2D'],
    'BSIT · 3rd year': ['3A', '3B', '3C', '3D'],
    'BSIT · 4th year': ['4A', '4B', '4C', '4D'],
  };

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={onCancel}
        type="button"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </button>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isEdit ? 'Edit course' : 'Add course'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Edit mode uses this same form
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Code & Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Course code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. PROG1"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition uppercase"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Course name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Programming 1"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              />
            </div>
          </div>

          {/* Program Select */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Program
            </label>
            <div className="relative">
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition cursor-pointer"
              >
                <option value="BSIT">Bachelor of Science in Information Technology (BSIT)</option>
                <option value="BSCS">Bachelor of Science in Computer Science (BSCS)</option>
                <option value="BSIS">Bachelor of Science in Information Systems (BSIS)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Sections Covered Chip Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Sections
              </label>
              <span className="text-xs text-slate-400">Click chips to assign sections</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              {Object.entries(sectionsByYear).map(([yearLabel, chips]) => (
                <div key={yearLabel} className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 block">{yearLabel}</span>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chip) => {
                      const isSelected = selectedSections.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleSection(chip)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border select-none ${
                            isSelected
                              ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5] shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] rounded-xl shadow-xs transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : isEdit ? 'Update course' : 'Save course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
