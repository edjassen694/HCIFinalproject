import React from 'react';

export default function StatCards({ stats, mode = 'students' }) {
  const cards = mode === 'courses' ? [
    { count: stats?.courses_count ?? 5, label: 'Courses' },
    { count: stats?.sections_count ?? 16, label: 'Sections' },
    { count: stats?.students_count ?? 120, label: 'Students' },
  ] : [
    { count: stats?.students_count ?? 120, label: 'Students' },
    { count: stats?.courses_count ?? 5, label: 'Courses' },
    { count: stats?.sections_count ?? 16, label: 'Sections' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200/80 rounded-2xl py-6 px-4 shadow-xs flex flex-col items-center justify-center transition hover:shadow-sm"
        >
          <span className="text-3xl sm:text-4xl font-bold text-[#4F46E5] tracking-tight">
            {card.count}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}
