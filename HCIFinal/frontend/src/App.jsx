import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import LoginView from './components/LoginView';
import CreateAccountView from './components/CreateAccountView';
import HomeDashboardView from './components/HomeDashboardView';
import StudentsView from './components/StudentsView';
import StudentForm from './components/StudentForm';
import CoursesView from './components/CoursesView';
import CourseForm from './components/CourseForm';
import ProfileView from './components/ProfileView';
import ChangePasswordView from './components/ChangePasswordView';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { api } from './api';

export default function App() {
  // Navigation: 'homepage' (default landing), 'home', 'students', 'courses', 'add-student', 'edit-student', 'add-course', 'edit-course', 'profile', 'change-password', 'login', 'create-account'
  const [activeTab, setActiveTab] = useState('homepage');

  // User state
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@school.edu',
    username: 'admin',
    role: 'Administrator',
  });

  // Data states
  const [stats, setStats] = useState({
    students_count: 120,
    courses_count: 5,
    sections_count: 16,
    new_this_week: 6,
    students_per_year: [
      { year: '1st year', count: 32 },
      { year: '2nd year', count: 30 },
      { year: '3rd year', count: 31 },
      { year: '4th year', count: 27 },
    ],
  });
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sectionsGrouped, setSectionsGrouped] = useState(null);

  // Search states
  const [studentSearch, setStudentSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');

  // Loading states
  const [studentLoading, setStudentLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  // Edit states
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    isDeleting: false,
  });

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch system stats
  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch {
      // Keep existing stats on failure
    }
  }, []);

  // Fetch students
  const fetchStudents = useCallback(async (page = 1, search = studentSearch) => {
    setStudentLoading(true);
    try {
      const data = await api.getStudents({ page, search, per_page: 10 });
      setStudents(data.data || []);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page,
      });
    } catch (err) {
      showToast(err.message || 'Failed to load students', 'error');
    } finally {
      setStudentLoading(false);
    }
  }, [studentSearch]);

  // Fetch courses
  const fetchCourses = useCallback(async (search = courseSearch) => {
    setCourseLoading(true);
    try {
      const data = await api.getCourses({ search });
      setCourses(data.data || []);
    } catch (err) {
      showToast(err.message || 'Failed to load courses', 'error');
    } finally {
      setCourseLoading(false);
    }
  }, [courseSearch]);

  // Fetch sections
  const fetchSections = useCallback(async () => {
    try {
      const data = await api.getSections();
      setSectionsGrouped(data.grouped || null);
    } catch {
      // Ignore
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStats();
    fetchSections();
  }, [fetchStats, fetchSections]);

  // Handle student search with debounce
  useEffect(() => {
    if (activeTab !== 'students') return undefined;
    const timer = setTimeout(() => {
      fetchStudents(1, studentSearch);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeTab, studentSearch, fetchStudents]);

  // Handle course search with debounce
  useEffect(() => {
    if (activeTab !== 'courses') return undefined;
    const timer = setTimeout(() => {
      fetchCourses(courseSearch);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeTab, courseSearch, fetchCourses]);

  // Delete student handler
  const handleDeleteStudent = (student) => {
    setDeleteModal({
      isOpen: true,
      title: 'Delete Student Record',
      message: `Are you sure you want to delete ${student.name || `${student.first_name} ${student.last_name}`} (${student.student_id})? This action cannot be undone.`,
      isDeleting: false,
      onConfirm: async () => {
        try {
          setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
          await api.deleteStudent(student.id);
          showToast('Student deleted successfully', 'success');
          setDeleteModal({ isOpen: false, title: '', message: '', onConfirm: null, isDeleting: false });
          fetchStudents(pagination?.current_page || 1);
          fetchStats();
        } catch (err) {
          showToast(err.message || 'Failed to delete student', 'error');
          setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
        }
      },
    });
  };

  // Delete course handler
  const handleDeleteCourse = (course) => {
    setDeleteModal({
      isOpen: true,
      title: 'Delete Course',
      message: `Are you sure you want to delete "${course.code} - ${course.name}"?`,
      isDeleting: false,
      onConfirm: async () => {
        try {
          setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
          await api.deleteCourse(course.id);
          showToast('Course deleted successfully', 'success');
          setDeleteModal({ isOpen: false, title: '', message: '', onConfirm: null, isDeleting: false });
          fetchCourses();
          fetchStats();
        } catch (err) {
          showToast(err.message || 'Failed to delete course', 'error');
          setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
        }
      },
    });
  };

  // Save course (Add or Update)
  const handleSaveCourse = async (courseData) => {
    if (editingCourse) {
      await api.updateCourse(editingCourse.id, courseData);
    } else {
      await api.createCourse(courseData);
    }
    fetchCourses();
    fetchStats();
  };

  // Dedicated full-screen views (Public Homepage, Login, Create Account)
  if (activeTab === 'homepage') {
    return <Homepage onNavigate={setActiveTab} stats={stats} />;
  }

  if (activeTab === 'login') {
    return (
      <LoginView
        onLoginSuccess={(u) => {
          setUser(u);
          setActiveTab('home');
        }}
        onNavigate={setActiveTab}
        showToast={showToast}
      />
    );
  }

  if (activeTab === 'create-account') {
    return (
      <CreateAccountView
        onRegisterSuccess={(u) => {
          setUser(u);
          setActiveTab('home');
        }}
        onNavigate={setActiveTab}
        showToast={showToast}
      />
    );
  }

  // Authenticated Portal Views (Navbar + Centered Container + Footer)
  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col justify-between selection:bg-[#4F46E5]/20 selection:text-[#4F46E5]">
      {/* Centered App Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12 space-y-6">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onLogout={async () => {
            try { await api.logout(); } catch { /* Clear the local session even if the API is unavailable. */ }
            setUser(null);
            showToast('Signed out successfully');
            setActiveTab('homepage');
          }}
        />

        {/* 7 – Home Dashboard */}
        {activeTab === 'home' && (
          <HomeDashboardView
            stats={stats}
            onNavigate={setActiveTab}
            onDataChanged={() => {
              fetchStats();
              fetchStudents(1);
            }}
            showToast={showToast}
          />
        )}

        {/* 2 – Students View */}
        {activeTab === 'students' && (
          <StudentsView
            students={students}
            stats={stats}
            pagination={pagination}
            search={studentSearch}
            setSearch={setStudentSearch}
            onPageChange={(page) => fetchStudents(page)}
            onAddStudent={() => {
              setEditingStudent(null);
              setActiveTab('add-student');
            }}
            onEditStudent={(student) => {
              setEditingStudent(student);
              setActiveTab('edit-student');
            }}
            onDeleteStudent={handleDeleteStudent}
            loading={studentLoading}
          />
        )}

        {/* 3 – Add / Edit Student */}
        {(activeTab === 'add-student' || activeTab === 'edit-student') && (
          <StudentForm
            studentToEdit={editingStudent}
            onCancel={() => {
              setEditingStudent(null);
              setActiveTab('students');
            }}
            onSaved={() => {
              setEditingStudent(null);
              setActiveTab('students');
              fetchStudents(1);
              fetchStats();
            }}
            showToast={showToast}
          />
        )}

        {/* 5 – Courses View */}
        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            sectionsGrouped={sectionsGrouped}
            stats={stats}
            search={courseSearch}
            setSearch={setCourseSearch}
            onAddCourse={() => {
              setEditingCourse(null);
              setActiveTab('add-course');
            }}
            onEditCourse={(course) => {
              setEditingCourse(course);
              setActiveTab('edit-course');
            }}
            onDeleteCourse={handleDeleteCourse}
            loading={courseLoading}
          />
        )}

        {/* 6 – Add / Edit Course */}
        {(activeTab === 'add-course' || activeTab === 'edit-course') && (
          <CourseForm
            courseToEdit={editingCourse}
            onCancel={() => {
              setEditingCourse(null);
              setActiveTab('courses');
            }}
            onSaved={handleSaveCourse}
            showToast={showToast}
          />
        )}

        {/* 8 – My Profile */}
        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            onNavigate={setActiveTab}
            onUpdateUser={setUser}
            onLogout={async () => {
              try { await api.logout(); } catch { /* Clear the local session even if the API is unavailable. */ }
              setUser(null);
              showToast('Signed out successfully');
              setActiveTab('homepage');
            }}
            showToast={showToast}
          />
        )}

        {/* 9 – Change Password */}
        {activeTab === 'change-password' && (
          <ChangePasswordView
            onNavigate={setActiveTab}
            showToast={showToast}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <p>© 2026 Student Management System</p>
        <p>BSIT Student Records</p>
      </footer>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={deleteModal.message}
        isDeleting={deleteModal.isDeleting}
        onConfirm={deleteModal.onConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, title: '', message: '', onConfirm: null, isDeleting: false })}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
