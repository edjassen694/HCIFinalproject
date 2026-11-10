import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, User, KeyRound, LogOut, ExternalLink } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border border-slate-200/80 rounded-2xl px-6 py-3.5 shadow-xs flex items-center justify-between relative">
      {/* Brand / Logo */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5 cursor-pointer select-none"
      >
        <div className="w-8 h-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center shadow-xs">
          <GraduationCap className="w-5 h-5" />
        </div>
        <span className="font-bold text-slate-900 text-base tracking-tight">Student MS</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
            activeTab === 'students' || activeTab === 'add-student' || activeTab === 'edit-student'
              ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
            activeTab === 'courses' || activeTab === 'add-course' || activeTab === 'edit-course'
              ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Courses
        </button>
      </nav>

      {/* Admin Avatar & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Account Menu"
          className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-semibold text-xs flex items-center justify-center ring-1 ring-[#4F46E5]/20 hover:ring-[#4F46E5]/40 transition cursor-pointer"
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
            <div className="px-3.5 py-2 border-b border-slate-100">
              <p className="font-semibold text-slate-800 truncate">{user?.name || 'Admin User'}</p>
              <p className="text-slate-400 text-2xs truncate">{user?.email || 'admin@school.edu'}</p>
            </div>

            <button
              onClick={() => {
                setActiveTab('profile');
                setDropdownOpen(false);
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('change-password');
                setDropdownOpen(false);
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>Change Password</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('homepage');
                setDropdownOpen(false);
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition border-t border-slate-100"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Public Homepage</span>
            </button>

            <button
              onClick={() => {
                setDropdownOpen(false);
                onLogout();
              }}
              className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
            >
              <LogOut className="w-3.5 h-3.5 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
