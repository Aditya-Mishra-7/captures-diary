# 📓 Captures Diary

A lightweight, secure, full-stack personal journal application engineered from scratch using modern JavaScript (ES Modules). This platform provides users with a private repository to document their thoughts, featuring an isolated user architecture and a retro terminal dark-mode interface.

## ⚡ Core Features

* **Complete Session Authentication:** Implements explicit registration, login, and termination routes using session cookies to keep tracking secure.
* **Granular CRUD Operations:** Users can draft fresh logs, stream their chronological timeline, modify past inputs, or purge records entirely.
* **Data Privacy Guardrails:** Custom middleware evaluates user tokens on every request, ensuring that a logged-in user can never view, edit, or delete another user's journal entries.
* **Unified Database Layer:** Combines cohesive user profiles and data logging into a singular data layout via Mongoose, minimizing code bloat.
* **Zero UI Libraries:** Built using pure semantic HTML/EJS templates and native CSS variables for a fast, minimalist user experience.

## 🛠️ Built With

* **Backend Environment:** Node.js & Express.js
* **Database Management:** MongoDB & Mongoose
* **Session Security:** Express-Session & BcryptJS (for cryptographic passcode hashing)
* **Template Engine:** Embedded JavaScript (EJS) with Method-Override

## 🚀 Local Installation & Execution

To test the system locally on your environment, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/captures-diary.git](https://github.com/YOUR_USERNAME/captures-diary.git)
   cd captures-diary
