# Task Manager Application

A robust full-stack web application designed to streamline task management, user administration, and reporting. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS.

## 🚀 Features

### 🛡️ Admin Capabilities
- **Dashboard**: Comprehensive overview of system statistics.
- **User Management**: Manage users and roles.
- **Task Management**: Create, edit, delete, and assign tasks.
- **Reporting**: Generate and view reports (Excel export supported).

### 👤 User Capabilities
- **Personal Dashboard**: View assigned tasks and progress.
- **My Tasks**: Track and update task status.
- **Task Details**: View detailed information about specific tasks.

### 🔐 Security & Core
- **Authentication**: Secure Login/Register system with JWT.
- **Role-Based Access Control**: Distinct interfaces for Admins and Users.
- **File Uploads**: Support for task attachments.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State/Routing**: React Router DOM
- **HTTP Client**: Axios
- **Visualization**: Recharts
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & Bcryptjs
- **File Handling**: Multer (Uploads), ExcelJS (Reports)

## 📂 Project Structure

```
Task-Manager/
├── backend/                # Node.js/Express Server
│   ├── config/            # DB Configuration
│   ├── controllers/       # Route Controllers
│   ├── models/            # Mongoose Models
│   ├── routes/            # API Routes
│   └── server.js          # Entry Point
│
└── frontend/
    └── Task-Manager/      # React Client
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   └── context/
        └── vite.config.js
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Manager
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ADMIN_INVITE_TOKEN=your_admin_invite_token
   ```

   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/Task-Manager
   npm install
   ```

   Start the client:
   ```bash
   npm run dev
   ```

## 🔌 API Endpoints

- **Auth**: `/api/auth`
- **Users**: `/api/users`
- **Tasks**: `/api/tasks`
- **Reports**: `/api/reports`

## 👨‍💻 Author

- **Haidar Shariefa**