import React, { useState } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { api } from '../api';

export default function CreateAccountView({ onRegisterSuccess, onNavigate, showToast }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await api.register({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      });
      showToast('Account created successfully!', 'success');
      onRegisterSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col justify-between items-center p-4 sm:p-6">
      {/* Back link */}
      <div className="w-full max-w-lg pt-4">
        <button
          onClick={() => onNavigate('homepage')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-500/5 my-auto">
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center mx-auto shadow-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create an account</h1>
          <p className="text-sm text-slate-500">Set up admin access to Student MS</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@school.edu"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 chars"
                  required
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold text-sm shadow-xs transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
          >
            Log in
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 pb-2">© 2026 Student Management System</p>
    </div>
  );
}
