import React from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import StatCards from './StatCards';
import SearchBar from './SearchBar';

export default function CoursesView({
  courses,
  sectionsGrouped,
  stats,
  search,
  setSearch,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
  loading,
}) {
  const yearTitles = {
    1: 'BSIT - 1st year',
    2: 'BSIT - 2nd year',
    3: 'BSIT - 3rd year',
    4: 'BSIT - 4th year',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Courses</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Manage BSIT courses and their sections
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search course by name or code"
      />

      {/* Metrics Row */}
      <StatCards stats={stats} mode="courses" />

      {/* BSIT Sections Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">BSIT sections</h2>
          <p className="text-xs text-slate-400 mt-0.5">1A to 1D up to 4A to 4D</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-1">
          {[1, 2, 3, 4].map((year) => {
            const list = sectionsGrouped?.[year] || [
              { id: `${year}A`, name: `${year}A` },
              { id: `${year}B`, name: `${year}B` },
              { id: `${year}C`, name: `${year}C` },
              { id: `${year}D`, name: `${year}D` },
            ];

            return (
              <div key={year} className="space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">
                  {yearTitles[year]}
                </span>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {list.map((sec) => (
                    <div
                      key={sec.id || sec.name}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#4F46E5] hover:text-[#4F46E5] transition select-none"
                    >
                      {sec.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BSIT Course List Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">BSIT course list</h2>
          <button
            onClick={onAddCourse}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-medium text-xs sm:text-sm shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add course</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
                <th className="pb-3 pl-2 font-medium">Code</th>
                <th className="pb-3 font-medium">Course name</th>
                <th className="pb-3 font-medium">Sections</th>
                <th className="pb-3 pr-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#4F46E5]" />
                    <p className="text-xs">Loading courses...</p>
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium text-slate-600">No courses found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {search ? 'Try adjusting your search criteria.' : 'Click "+ Add course" to create one.'}
                    </p>
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-2 font-semibold text-slate-800 text-xs sm:text-sm">
                      {course.code}
                    </td>
                    <td className="py-4 font-normal text-slate-900 text-xs sm:text-sm">
                      {course.name}
                    </td>
                    <td className="py-4 font-normal text-slate-600 text-xs sm:text-sm">
                      {course.sections || 'BSIT 1A–4D'}
                    </td>
                    <td className="py-4 pr-2 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => onEditCourse(course)}
                          title="Edit course"
                          className="w-7 h-7 rounded-lg bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center transition cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => onDeleteCourse(course)}
                          title="Delete course"
                          className="w-7 h-7 rounded-lg bg-[#FEE2E2] hover:bg-[#FECACA] text-[#EF4444] flex items-center justify-center transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
