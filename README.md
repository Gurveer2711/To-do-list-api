# To-Do List Application

## Description

A RESTful API for managing to-do tasks with user authentication.

## Dependencies

Install these packages using `npm install`:

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- nodemon
- cookie-parser

## Routes

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Task Routes

- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

## Setup

1. Clone repository
2. Run `npm install`
3. Create `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Run `npm start`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

## Features

- User authentication
- CRUD operations for tasks
- JWT token-based security
- Input validation
- Error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

