# Task Management System

This is a task management system API built with Node.js, Express, PostgreSQL, and TypeScript. The system allows users to create, update, and delete tasks, while ensuring that only authenticated users can manage their own tasks.

## Features
- **User Registration**: Register new users.
- **Task Creation**: Authenticated users can create tasks.
- **Task Management**: Users can update or delete their own tasks.
- **Authentication**: Authentication middleware using JWT to protect endpoints.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Relational database to store users and tasks.
- **TypeScript**: Static typing for JavaScript.
- **JWT**: JSON Web Token for authentication.
- **pg**: PostgreSQL client for Node.js.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- PostgreSQL
- TypeScript

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/saurabhraut1212/task_management_backend.git
   cd server
   ```
2. Install the dependencies
   ```bash
   npm install
   ```
3. Setup postgresql
 - Create a database named task_management.
 - Create two tables: users and tasks using the following SQL commands:
   ```bash
   CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL
   );

   CREATE TABLE tasks (
   id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   title VARCHAR(255) NOT NULL,
   description TEXT,
   due_date DATE,
   completed BOOLEAN DEFAULT false
   );
   ```
4.Run the server
  ```bash
   npm run dev
  ```
