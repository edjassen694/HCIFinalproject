import React from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import StatCards from './StatCards';
import SearchBar from './SearchBar';

export default function StudentsView({
  students,
  stats,
  pagination,
  search,
  setSearch,
  onPageChange,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  loading,
}) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-semibold text-sm flex items-center justify-center ring-1 ring-[#4F46E5]/20 shrink-0">
          A
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Welcome, Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">Administrator</p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search student by name or ID"
      />

      {/* Metrics Row */}
      <StatCards stats={stats} mode="students" />

      {/* Student Records Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        {/* Table Card Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Student records</h2>
          <button
            onClick={onAddStudent}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-medium text-xs sm:text-sm shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add student</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
                <th className="pb-3 pl-2 font-medium">ID</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 pr-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#4F46E5]" />
                    <p className="text-xs">Loading records...</p>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium text-slate-600">No student records found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {search ? 'Try adjusting your search criteria.' : 'Click "+ Add student" to create one.'}
                    </p>
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-2 font-normal text-slate-600 text-xs sm:text-sm">
                      {student.student_id}
                    </td>
                    <td className="py-4 font-semibold text-slate-900 text-xs sm:text-sm">
                      {student.name || `${student.first_name} ${student.last_name}`}
                    </td>
                    <td className="py-4 font-normal text-slate-600 text-xs sm:text-sm">
                      {student.course}
                    </td>
                    <td className="py-4 pr-2 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => onEditStudent(student)}
                          title="Edit student"
                          className="w-7 h-7 rounded-lg bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center transition cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => onDeleteStudent(student)}
                          title="Delete student"
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

        {/* Pagination Controls */}
        {pagination && pagination.last_page > 1 && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 select-none">
            <button
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page <= 1}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-600 transition flex items-center gap-1 cursor-pointer disabled:cursor-default"
            >
              Previous
            </button>

            {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
              .filter((page) => {
                // Show current page, +- 1 page, first, and last page
                return (
                  page === 1 ||
                  page === pagination.last_page ||
                  Math.abs(page - pagination.current_page) <= 1
                );
              })
              .map((page, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && page - prev > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className="text-slate-400 text-xs px-1">...</span>}
                    <button
                      onClick={() => onPageChange(page)}
                      className={`w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center transition ${
                        page === pagination.current_page
                          ? 'bg-[#4F46E5] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page >= pagination.last_page}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-600 transition flex items-center gap-1 cursor-pointer disabled:cursor-default"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
