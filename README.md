# 🌍 GlobeTrek

**The Tourist Guide** is an online platform that helps travelers explore and plan their trips across Bangladesh. It offers detailed information about destinations, packages, guides, and local culture to enhance the travel experience for tourists.

---

## 🔑 Admin Access

- **Admin Username:** shsoburhossen951@gmail.com
- **Admin Password:** Sobur hossen

> Replace with your actual credentials before deployment.

---

## 🔗 Live Site

[🌐 Visit the Live Website](https://your-live-site-url.com)

---

## ✨ Key Features

- 🔐 **Authentication System:** Email/password & Google login, with token-based secure route protection and logout.
- 👥 **Three User Roles:** Tourist, Tour Guide, Admin with separate dashboards and responsibilities.
- 🧭 **Home Page:** Includes a dynamic banner, overview video, featured packages, guide section, and user stories.
- 📦 **Tour Packages:** Show random packages using MongoDB `$sample`, and allow logged-in users to book them.
- 📅 **Booking System:** Tourists can book a tour with selected guides, datepicker input, and secure payment via Stripe.
- 📖 **Tourist Stories:** Users and guides can add, edit, delete, and share stories on Facebook using `react-share`.
- 🎓 **Apply as Tour Guide:** Tourists can apply to become a guide with form submission and admin approval system.
- 🧑‍💻 **Admin Panel:** Admins can manage users, assign roles, view stats, approve/reject applications, and add packages.
- 🧾 **Responsive Dashboard:** Device-responsive design (mobile, tablet, desktop) with dynamic layouts for all roles.
- 🎉 **User Milestones:** Shows animated congratulations using `react-confetti` after 3+ successful bookings.
- 🚀 **Smooth UI/UX:** Framer Motion used for animation on the homepage, SweetAlert/Toasts for all actions, no default alerts.

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, React Router, Framer Motion, SweetAlert2, React Datepicker
- **State & Data Management:** TanStack React Query (for all GET requests)
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Authentication:** Firebase Auth
- **Payment Integration:** Stripe
- **File Uploads:** Image upload to a third-party service (e.g., ImgBB/Cloudinary)
- **Other Libraries:** React Share, React Confetti, React Select, React Tabs

---

## 🔒 Environment Variables

All sensitive data (Firebase config, MongoDB URI, Stripe keys, etc.) are stored in environment variables and are **NOT** exposed in the source code.