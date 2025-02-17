# Solaris - Poster Shop

A robust front-end project (with references to a MERN full-stack setup) designed for seamless management and organization of digital posters. Solaris provides features such as user registration, login with JWT-based authentication, form validation, and fluid UI/UX using Shadcn UI + Tailwind CSS.

---

## Features

1. **User Authentication & Authorization**
   - Registration (Sign Up) and Login via secure JWT-based flows.
   - Logout mechanism that removes user data and session cookies.
   - Basic client-side validation (e.g., email, password strength).

2. **Responsive UI**
   - A modern dark-themed interface with blur effects.
   - Responsive Navbar with dropdown menus for categories and user profile.
   - Toast notifications for success or error feedback.

3. **Dynamic Components**
   - Animated image grid on the homepage (GridMotion).
   - Reusable form elements (Inputs, Buttons, Labels) powered by React Hook Form.
   - Toast notifications (using a custom toast hook).

4. **Code Architecture**
   - Organized into clearly separated pages (e.g., Homepage, Login, Create User).
   - Well-structured folder hierarchy for easy maintainability.

---

## Tech Stack

### Frontend
- [React 18+](https://reactjs.org/)  
- [React Router v6+](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) for fast development builds.
- [Tailwind CSS & Shadcn UI](https://tailwindcss.com/) for styling and custom variants.
- [Axios](https://axios-http.com/) for handling HTTP requests.
- [React Hook Form](https://react-hook-form.com/) for form-handling and validations.
- [Lucide React Icons](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons) for UI icons.
- [React Toast (Radix + custom hook)](https://www.radix-ui.com/docs/primitives/components/toast) for notifications.
- [Shadcn UI](https://shadcn.com/) for UI components and design system.

### Backend (Referenced, Not In This Repo)
While this repository shows primarily the frontend code, Solaris is designed to work with a Node.js + Express + MongoDB stack:
- Node.js / Express server API
- MongoDB database (local or Atlas)

---

## Project Structure

```
Solaris/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js     # If applicable
├── tailwind.config.js    # If applicable
└── src/
    ├── App.jsx           # App entrypoint & routes
    ├── main.jsx          # Renders the React app
    ├── index.css         # Tailwind & global styles
    ├── components/
    │   ├── cui/          # Custom UI (Navbar, Footer, etc.)
    │   └── ui/           # Shadcn UI-based components (Toast, Form, etc.)
    ├── hooks/            # Custom React hooks (e.g., useToast)
    ├── pages/            # Page components (Homepage, Login, etc.)
    ├── validator/        # Validation logic and login checker
    └── lib/              # Utility functions
```

---

## Prerequisites

- [Node.js 16+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

You need a backend server for certain features (like user login/signup). By default, the frontend code references:
```
http://localhost:3000/api
```
as an example API base URL. You can adjust this as needed.

---

## Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/Solaris.git
   cd Solaris
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Start the Development Server**  
   ```bash
   npm run dev
   ```
   - Vite will start a dev server, typically on http://localhost:5173/ (printed in Terminal).

---

## License

Distributed under the MIT License.
