import React from 'react';
import { GraduationCap, Users, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Homepage({ onNavigate, stats }) {
  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col justify-between selection:bg-[#4F46E5]/20 selection:text-[#4F46E5]">
      {/* Top Bar */}
      <header className="w-full bg-white border-b border-slate-200 px-6 sm:px-12 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Student MS</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 rounded-lg bg-[#EEF2FF] text-[#4F46E5] font-semibold text-sm transition"
          >
            Home
          </button>
          <a 
            href="#features"
            className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 font-medium text-sm transition"
          >
            Features
          </a>
          <a 
            href="#about"
            className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 font-medium text-sm transition"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => onNavigate('create-account')}
            className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold shadow-xs transition"
          >
            Create account
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 space-y-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold tracking-wide">
              BSIT Student Records
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Manage student records, courses and sections in one place
            </h1>

            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
              Add, edit and organize students, BSIT courses and sections 1A to 4D from a single, simple admin dashboard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-7 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition flex items-center gap-2"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('create-account')}
                className="px-7 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base transition"
              >
                Create account
              </button>
            </div>
          </div>

          {/* Hero Right Preview Card */}
          <div 
            onClick={() => onNavigate('home')}
            title="Click to explore the Dashboard"
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/5 space-y-6 hover:border-[#4F46E5]/40 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-base group-hover:text-[#4F46E5] transition">Dashboard Preview</span>
              <span className="text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full flex items-center gap-1 group-hover:bg-[#4F46E5] group-hover:text-white transition">
                <span>Enter Portal</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
              </span>
            </div>

            {/* Stat row in preview */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-bold text-[#4F46E5] block">{stats?.students_count ?? 120}</span>
                <span className="text-xs text-slate-500 font-medium">Students</span>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-bold text-[#4F46E5] block">{stats?.courses_count ?? 5}</span>
                <span className="text-xs text-slate-500 font-medium">Courses</span>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-bold text-[#4F46E5] block">{stats?.sections_count ?? 16}</span>
                <span className="text-xs text-slate-500 font-medium">Sections</span>
              </div>
            </div>

            {/* Sample Table Rows in preview */}
            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono">001</span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm">Juan Dela Cruz</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold">BSIT</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono">002</span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm">Maria Santos</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold">BSIT</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono">003</span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm">Pedro Reyes</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold">BSIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to manage BSIT records
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Simple tools for administrators to keep student information accurate and up to date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Student records</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Add, search, edit and delete student records with a clean table and quick actions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Courses and sections</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Organize BSIT courses like Programming, OOP and HCI across sections 1A to 4D.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Secure admin access</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sign in with your own account so only authorized admins can manage records.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section id="about" className="bg-[#4F46E5] rounded-3xl p-8 sm:p-14 text-center text-white space-y-5 shadow-xl shadow-indigo-500/10">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to get started?</h2>
          <p className="text-indigo-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Create an account or log in to start managing student records.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('create-account')}
              className="px-6 py-3 rounded-xl bg-white text-[#4F46E5] font-semibold text-sm hover:bg-indigo-50 transition shadow-sm"
            >
              Create account
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              Login
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 Student Management System</p>
        <p className="text-slate-400">BSIT Student Records</p>
      </footer>
    </div>
  );
}
