# 🚀 Full-Stack Web Application

A modern, robust Full-Stack web application built with React, Node.js, Express, and MySQL. This project features a completely secure, custom-built authentication system using JSON Web Tokens (JWT) and a fully protected RESTful API.

## ✨ Key Features

*   **🔒 Secure Authentication:** Complete user registration, login, and logout flows managed securely with JWT.
*   **🛡️ Protected Routes:** Core API endpoints (like posts, comments, and todos) are protected via backend middleware (`authenticateToken`).
*   **🧠 Smart Client-Side Fetching:** A custom React hook (`useApi`) automatically intercepts API calls and attaches the Authorization token.
*   **⚡ Modern Architecture:** Clean separation of concerns (Controllers, Routes, Middleware) in the backend.
*   **🗄️ Relational Database:** Data is persistently stored and managed using MySQL.

---

## 🛠️ Tech Stack

**Frontend (Client)**
*   React
*   Context API (for Auth State Management)
*   React Router (Navigation)

**Backend (Server)**
*   Node.js & Express.js
*   `jsonwebtoken` (JWT for auth)

**Database**
*   MySQL (Version 8.0+ Recommended)

---

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:
*   **Node.js** installed on your machine.
*   **MySQL Server (8.0.x)** installed and running on port `3306`.
*   A tool like **MySQL Workbench** or DBeaver to manage the database.

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash```
git clone <your-repository-url>
cd <your-project-folder>
<img width="3819" height="1896" alt="צילום מסך 2026-06-14 201040" src="https://github.com/user-attachments/assets/98038a8b-f5a8-4fe3-8e23-a3637481db10" />
<img width="2445" height="1887" alt="צילום מסך 2026-06-14 201254" src="https://github.com/user-attachments/assets/66d12f64-fb4d-4c1f-adda-e0a6231bfa5e" />
<img width="2427" height="1839" alt="צילום מסך 2026-06-14 201305" src="https://github.com/user-attachments/assets/7aa78ebe-a349-4973-8806-0d33f1ad1b81" />
<img width="2496" height="1842" alt="צילום מסך 2026-06-14 201349" src="https://github.com/user-attachments/assets/b3632621-d0ce-4c17-814e-432b7236b908" />
<img width="3837" height="1905" alt="צילום מסך 2026-06-14 201326" src="https://github.com/user-attachments/assets/c78dda70-2836-4f83-8ed2-71488c179889" />
