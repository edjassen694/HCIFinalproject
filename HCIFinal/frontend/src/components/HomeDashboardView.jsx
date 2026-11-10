import React from 'react';
import { UserPlus, BookPlus, Users, BookOpen, ArrowRight, Plus, Pencil, Trash2 } from 'lucide-react';
import DatabaseHealthCard from './DatabaseHealthCard';

export default function HomeDashboardView({ stats, onNavigate, onDataChanged, showToast }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const studentsPerYear = stats?.students_per_year || [
    { year: '1st year', count: 32 },
    { year: '2nd year', count: 30 },
    { year: '3rd year', count: 31 },
    { year: '4th year', count: 27 },
  ];

  const recentActivity = stats?.recent_activity || [
    { id: 1, action: 'add', title: 'Maria Santos was added', subtitle: 'BSIT 3B', time_ago: '2 hours ago' },
    { id: 2, action: 'edit', title: "Juan Dela Cruz's record was updated", subtitle: 'BSIT 2A', time_ago: 'Yesterday' },
    { id: 3, action: 'add_course', title: 'HCI was added to BSIT sections', subtitle: 'Courses', time_ago: '2 days ago' },
    { id: 4, action: 'edit_course', title: 'Programming 2 was edited', subtitle: 'Courses', time_ago: '3 days ago' },
    { id: 5, action: 'delete', title: 'Pedro Reyes was removed', subtitle: 'BSIT 1C', time_ago: '4 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="w-full bg-[#4F46E5] rounded-3xl p-6 sm:p-9 text-white shadow-lg shadow-indigo-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Good morning, Prof</h1>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Here's an overview of your BSIT student records today.
          </p>
        </div>
        <div className="self-start sm:self-auto px-4 py-2 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs sm:text-sm font-semibold tracking-wide">
          {currentDate}
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl py-6 px-4 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-bold text-[#4F46E5] tracking-tight">
            {stats?.students_count ?? 120}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Students</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl py-6 px-4 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-bold text-[#4F46E5] tracking-tight">
            {stats?.courses_count ?? 5}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Courses</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl py-6 px-4 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-bold text-[#4F46E5] tracking-tight">
            {stats?.sections_count ?? 16}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Sections</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl py-6 px-4 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-bold text-[#4F46E5] tracking-tight">
            {stats?.new_this_week ?? 6}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-500 mt-1">New this week</span>
        </div>
      </div>

      {/* AI Database Health Inspector & Duplicate Detector Card */}
      <DatabaseHealthCard onDataChanged={onDataChanged} showToast={showToast} />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action 1: Add student */}
          <div
            onClick={() => onNavigate('add-student')}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base group-hover:text-[#4F46E5] transition">
                <span>Add student</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#4F46E5] transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Create a new student record</p>
            </div>
          </div>

          {/* Action 2: Add course */}
          <div
            onClick={() => onNavigate('add-course')}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base group-hover:text-[#4F46E5] transition">
                <span>Add course</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#4F46E5] transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Add a BSIT course and sections</p>
            </div>
          </div>

          {/* Action 3: View students */}
          <div
            onClick={() => onNavigate('students')}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base group-hover:text-[#4F46E5] transition">
                <span>View students</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#4F46E5] transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Search and manage records</p>
            </div>
          </div>

          {/* Action 4: View courses */}
          <div
            onClick={() => onNavigate('courses')}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base group-hover:text-[#4F46E5] transition">
                <span>View courses</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#4F46E5] transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">See courses and sections 1A–4D</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Recent activity</h2>
            <button 
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    item.action === 'add' || item.action === 'add_course' 
                      ? 'bg-emerald-50 text-emerald-600'
                      : item.action === 'delete'
                      ? 'bg-red-50 text-red-500'
                      : 'bg-indigo-50 text-[#4F46E5]'
                  }`}>
                    {item.action === 'add' || item.action === 'add_course' ? (
                      <Plus className="w-4 h-4" />
                    ) : item.action === 'delete' ? (
                      <Trash2 className="w-4 h-4" />
                    ) : (
                      <Pencil className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{item.time_ago}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Students per Year */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Students per year</h2>
            <p className="text-xs text-slate-400 mt-0.5">BSIT · all sections</p>
          </div>

          <div className="space-y-4 pt-1">
            {studentsPerYear.map((item, idx) => {
              const max = 35;
              const percent = Math.min(100, Math.round((item.count / max) * 100));

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{item.year}</span>
                    <span className="text-slate-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#F4F6FB] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#4F46E5] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
