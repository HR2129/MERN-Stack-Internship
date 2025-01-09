# My MERN Stack Internship Task

This is a full-stack application built with React for the frontend and Node.js with Express for the backend. The backend uses Sequelize with SQLite for the database. The application includes user authentication, and each user can create, read, update, and delete their own posts.

## Features

- User registration and login
- Authentication with JSON Web Tokens (JWT)
- CRUD operations for posts
- Each user sees only their own posts
- Protected routes for post management

## Technologies Used

### Frontend

- React
- Material-UI
- Axios
- React Router

### Backend

- Node.js
- Express
- Sequelize
- SQLite
- bcrypt
- jsonwebtoken

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-react-project.git
   cd my-react-project

   cd backend
   npm install

   cd backend
   node server.js
   
   cd ../frontend
   npm install

   cd ../frontend
   npm run dev

## Project Structure:

   my-react-project/
   ├── backend/
   │   ├── models/
   │   │   └── index.js
   │   ├── server.js
   │   └── package.json
   └── frontend/
       ├── src/
       │   ├── components/
       │   │   ├── Navbar.jsx
       │   │   ├── Register.jsx
       │   │   ├── Login.jsx
       │   │   ├── Posts.jsx
       │   │   ├── EditPost.jsx
       │   │   └── DisplayUsers.jsx
       │   ├── App.jsx
       │   └── index.css
       └── package.json


## API Endpoints

  Authentication
      POST /api/register: Register a new user
      POST /api/login: Login a user and receive a JWT
  Posts
      POST /api/posts: Create a new post (protected route)
      GET /api/posts: Get all posts for the logged-in user (protected route)
      PUT /api/posts/:id: Update a post by ID (protected route)
      DELETE /api/posts/:id: Delete a post by ID (protected route)
   
