const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

function requestHeaders(extra = {}) {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('student_ms_token') : null;
  return { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra };
}

async function readResponse(res, fallbackMessage) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(json.message || fallbackMessage);
    error.errors = json.errors;
    throw error;
  }
  return json;
}

export const api = {
  // AI Database Health Inspector & Duplicate Detector
  async getDatabaseHealth() {
    const res = await fetch(`${API_BASE}/ai/health`, { headers: requestHeaders() });
    if (!res.ok) throw new Error('Failed to fetch database health report');
    return res.json();
  },

  async scanDatabaseHealth() {
    const res = await fetch(`${API_BASE}/ai/health/scan`, {
      method: 'POST',
      headers: requestHeaders(),
    });
    if (!res.ok) throw new Error('Failed to run database health scan');
    return res.json();
  },

  async applyHealthFix(data) {
    const res = await fetch(`${API_BASE}/ai/health/fix`, {
      method: 'POST',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to apply fix');
    return json;
  },

  // Auth
  async login(credentials) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Login failed');
      err.errors = json.errors;
      throw err;
    }
    if (json.token) localStorage.setItem('student_ms_token', json.token);
    return json;
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Registration failed');
      err.errors = json.errors;
      throw err;
    }
    if (json.token) localStorage.setItem('student_ms_token', json.token);
    return json;
  },

  async logout() {
    try {
      await fetch(`${API_BASE}/logout`, { method: 'POST', headers: requestHeaders() });
    } finally {
      localStorage.removeItem('student_ms_token');
    }
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Failed to update profile');
      err.errors = json.errors;
      throw err;
    }
    return json;
  },

  async changePassword(data) {
    const res = await fetch(`${API_BASE}/change-password`, {
      method: 'PUT',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Failed to change password');
      err.errors = json.errors;
      throw err;
    }
    if (json.token) localStorage.setItem('student_ms_token', json.token);
    return json;
  },

  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`, { headers: requestHeaders() });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Students
  async getStudents(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.search) query.append('search', params.search);
    if (params.per_page) query.append('per_page', params.per_page);

    const res = await fetch(`${API_BASE}/students?${query.toString()}`, { headers: requestHeaders() });
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json();
  },

  async getStudent(id) {
    const res = await fetch(`${API_BASE}/students/${id}`, { headers: requestHeaders() });
    if (!res.ok) throw new Error('Failed to fetch student record');
    return res.json();
  },

  async createStudent(data) {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Validation failed');
      err.errors = json.errors;
      throw err;
    }
    return json;
  },

  async updateStudent(id, data) {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'PUT',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Validation failed');
      err.errors = json.errors;
      throw err;
    }
    return json;
  },

  async deleteStudent(id) {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'DELETE',
      headers: requestHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete student');
    return res.json();
  },

  // Courses
  async getCourses(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/courses?${query.toString()}`, { headers: requestHeaders() });
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  },

  async createCourse(data) {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Validation failed');
      err.errors = json.errors;
      throw err;
    }
    return json;
  },

  async updateCourse(id, data) {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: requestHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(json.message || 'Validation failed');
      err.errors = json.errors;
      throw err;
    }
    return json;
  },

  async deleteCourse(id) {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
      headers: requestHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete course');
    return res.json();
  },

  // Sections
  async getSections() {
    const res = await fetch(`${API_BASE}/sections`, { headers: requestHeaders() });
    if (!res.ok) throw new Error('Failed to fetch sections');
    return res.json();
  },
};
