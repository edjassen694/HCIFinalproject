import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { api } from '../api';

export default function ChangePasswordView({ onNavigate, showToast }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSaving(true);

    try {
      await api.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      showToast('Password changed successfully!', 'success');
      onNavigate('profile');
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Back button */}
      <button
        onClick={() => onNavigate('profile')}
        type="button"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </button>

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Change password</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Ensure your account is using a long, random password to stay secure
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Current password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min. 8 characters)"
                required
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Confirm new password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="px-6 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] rounded-xl shadow-xs transition disabled:opacity-50"
            >
              {saving ? 'Updating...' : 'Update password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
