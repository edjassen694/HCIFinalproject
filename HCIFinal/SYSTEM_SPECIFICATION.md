# Student MS – Complete System Specification & Implementation (All 10 Figma Screens)

> **Source Figma Link:** [Student Management System – Design Draft](https://www.figma.com/design/r3gdQg4DXewjYrM7itsLH4/Student-Management-System-%E2%80%93-Design-Draft?node-id=0-1&t=Q8MEPmSXBfAngZEf-1)
> **Course / Context:** Human-Computer Interaction (HCI) Final Project
> **Architecture:** Decoupled React 19 SPA + Laravel 12 REST API + SQLite / PostgreSQL
> **Zero-Cost Deployment:** Neon DB + Render/Koyeb + Vercel ($0.00 / 100% Free)

---

## 📱 Complete Screen Inventory (All 10 Frames)

| Frame # | Frame Name in Figma | Route / View in App | Description |
|---|---|---|---|
| **0** | `0 – Homepage` | `activeTab='homepage'` | Public portal landing page featuring Top Bar, Hero with Live Dashboard Preview, Features Grid, and CTA banner. |
| **1** | `1 – Welcome / Login` | `activeTab='login'` | Clean authentication card with Username/Password, Remember me checkbox, and Create account link. |
| **2** | `2 – Students` | `activeTab='students'` | Main records dashboard with "Welcome, Admin", search bar, 3 stat cards, and student records table with pagination. |
| **3** | `3 – Add / Edit Student` | `activeTab='add-student'` | Reusable form with "← Back to Students", Student ID, First/Last Name, Email, Course and Section selects. |
| **4** | `4 – Create Account` | `activeTab='create-account'` | Admin account registration form with First/Last Name, Email, Username, Password, and Confirm password. |
| **5** | `5 – Courses` | `activeTab='courses'` | BSIT courses table with + Add course, course search, and 16 section badges grouped across 1st to 4th year. |
| **6** | `6 – Add Course` | `activeTab='add-course'` | Full-page course form with "← Back to Courses", Course code/name, Program select, and interactive section chip toggles. |
| **7** | `7 – Home` | `activeTab='home'` | Authenticated Home dashboard with Welcome Banner, 4 stat cards (`120`, `5`, `16`, `6 New`), 4 Quick Actions, Recent Activity feed, and Students per year progress bars. |
| **8** | `8 – My Profile` | `activeTab='profile'` | Profile management screen with Profile Summary card (avatar, username, email, access) and Personal Information form. |
| **9** | `9 – Change Password` | `activeTab='change-password'` | Secure password change screen with Current password, New password, and confirmation inputs. |

---

## 🎨 Exact Figma Design Tokens

* **Primary Indigo:** `#4F46E5`
* **Light Tint:** `#EEF2FF`
* **Body Canvas:** `#F4F6FB` / `#F2F4F9`
* **Card Surface:** `#FFFFFF`
* **Border:** `#E2E8F0`
* **Text Primary:** `#0F172A` / `#1E293B`
* **Text Secondary:** `#64748B`
* **Destructive Accent:** `#EF4444` on `#FEE2E2`
