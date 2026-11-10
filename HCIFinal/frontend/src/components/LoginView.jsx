import React, { useState } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { api } from '../api';

export default function LoginView({ onLoginSuccess, onNavigate, showToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login({ username, password });
      showToast('Welcome back, Admin!', 'success');
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col justify-between items-center p-4 sm:p-6">
      {/* Back to Home Link */}
      <div className="w-full max-w-md pt-4">
        <button
          onClick={() => onNavigate('homepage')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-500/5 my-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center mx-auto shadow-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to manage student records</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition"
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

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#EEF2FF] border-slate-300"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => showToast('Password reset link sent to registered email.', 'success')}
              className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold text-sm shadow-xs transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Switch */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Don't have an account? </span>
          <button
            onClick={() => onNavigate('create-account')}
            className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition"
          >
            Create account
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 pb-2">© 2026 Student Management System</p>
    </div>
  );
}
