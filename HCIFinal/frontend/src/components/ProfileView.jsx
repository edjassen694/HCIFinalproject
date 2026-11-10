import React, { useState } from 'react';
import { ArrowLeft, KeyRound, LogOut } from 'lucide-react';
import { api } from '../api';

export default function ProfileView({ user, onNavigate, onUpdateUser, onLogout, showToast }) {
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(' ')[0] : 'Admin');
  const [lastName, setLastName] = useState(user?.name ? user.name.split(' ').slice(1).join(' ') || 'User' : 'User');
  const [email, setEmail] = useState(user?.email || 'admin@school.edu');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = await api.updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
      });
      onUpdateUser(data.user);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={() => onNavigate('home')}
        type="button"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">My profile</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          View and update your account information
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Profile Summary */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-4xl flex items-center justify-center ring-4 ring-[#EEF2FF]/60 shadow-xs">
            {firstName.charAt(0).toUpperCase() || 'A'}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">{firstName} {lastName}</h2>
            <div className="inline-block mt-1 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold">
              Administrator
            </div>
          </div>

          <div className="w-full border-t border-slate-100 pt-3 text-xs divide-y divide-slate-100 text-left">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Username</span>
              <span className="font-semibold text-slate-800">{user?.username || 'admin'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Email</span>
              <span className="font-semibold text-slate-800">{email}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Access</span>
              <span className="font-semibold text-slate-800">Students, Courses</span>
            </div>
          </div>

          <div className="w-full pt-2 space-y-2">
            <button
              onClick={() => onNavigate('change-password')}
              className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-slate-400" />
              <span>Change password</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>

        {/* Right: Personal Information Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Personal information</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Update your name and contact details
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                  First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              />
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] rounded-xl shadow-xs transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
