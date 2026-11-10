import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { api } from '../api';

export default function StudentForm({ studentToEdit, onCancel, onSaved, showToast }) {
  const isEdit = Boolean(studentToEdit);

  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('BSIT');
  const [section, setSection] = useState('3B');

  const [availableSections, setAvailableSections] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Populate form if editing
    if (studentToEdit) {
      setStudentId(studentToEdit.student_id || '');
      setFirstName(studentToEdit.first_name || '');
      setLastName(studentToEdit.last_name || '');
      setEmail(studentToEdit.email || '');
      setCourse(studentToEdit.course || 'BSIT');
      setSection(studentToEdit.section || '3B');
    } else {
      setStudentId('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setCourse('BSIT');
      setSection('3B');
    }
    setErrors({});
  }, [studentToEdit]);

  // Load sections and courses for dropdowns
  useEffect(() => {
    async function loadOptions() {
      try {
        const [secRes, courseRes] = await Promise.all([
          api.getSections().catch(() => null),
          api.getCourses().catch(() => null),
        ]);

        if (secRes?.all) {
          setAvailableSections(secRes.all.map((s) => s.name));
        } else {
          setAvailableSections([
            '1A', '1B', '1C', '1D',
            '2A', '2B', '2C', '2D',
            '3A', '3B', '3C', '3D',
            '4A', '4B', '4C', '4D',
          ]);
        }

        if (courseRes?.data && courseRes.data.length > 0) {
          setAvailableCourses(courseRes.data.map((c) => c.code));
        } else {
          setAvailableCourses(['BSIT', 'BSCS', 'BSIS']);
        }
      } catch {
        // Fallbacks
        setAvailableSections([
          '1A', '1B', '1C', '1D',
          '2A', '2B', '2C', '2D',
          '3A', '3B', '3C', '3D',
          '4A', '4B', '4C', '4D',
        ]);
        setAvailableCourses(['BSIT']);
      }
    }
    loadOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);

    const payload = {
      student_id: studentId.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      course: course.trim(),
      section: section.trim(),
    };

    try {
      if (isEdit) {
        await api.updateStudent(studentToEdit.id, payload);
        showToast('Student record updated successfully!', 'success');
      } else {
        await api.createStudent(payload);
        showToast('Student record created successfully!', 'success');
      }
      onSaved();
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        showToast(err.message || 'Failed to save student', 'error');
      }
    } finally {
      setSaving(false);
    }
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
        Back to Students
      </button>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isEdit ? 'Edit student' : 'Add student'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Edit mode uses this same form
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student ID */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 2024-0001"
              required
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.student_id ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
              } text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition`}
            />
            {errors.student_id && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.student_id[0]}</p>
            )}
          </div>

          {/* First name and Last name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.first_name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                } text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition`}
              />
              {errors.first_name && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.first_name[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.last_name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                } text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition`}
              />
              {errors.last_name && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.last_name[0]}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
              } text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.email[0]}</p>
            )}
          </div>

          {/* Course & Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Course
              </label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition cursor-pointer"
                >
                  {availableCourses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Section
              </label>
              <div className="relative">
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition cursor-pointer"
                >
                  {availableSections.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Row */}
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
              {saving ? 'Saving...' : 'Save student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
