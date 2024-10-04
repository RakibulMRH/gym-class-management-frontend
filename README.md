# Gym Class Management Backend

This is the backend for the **Gym Class Scheduling and Membership Management System**. It is built with **Node.js**, **Express.js**, and uses **PostgreSQL** as the database. The system is designed to manage gym operations efficiently, defining three roles: Admin, Trainer, and Trainee, each with specific permissions.

## Project Overview

The system provides functionality to manage gym classes, trainer profiles, and trainee bookings, as well as role-based access to different features such as:
- Admin: Create and manage trainers, schedule classes, and assign trainers.
- Trainer: View assigned classes.
- Trainee: Create and manage their profiles, book and cancel class schedules.

## Technology Stack

- **Programming Language**: JavaScript (Node.js)
- **Web Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma (or similar)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: `dotenv` for managing environment variables.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [Git](https://git-scm.com/)

### Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/RakibulMRH/gym-class-management-backend.git
   cd gym-class-management-backend
   ```

2. **Install Dependencies**:

   After cloning the repository, install the project dependencies:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:

   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```bash
   PORT=3000
   JWT_SECRET=default_secret
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=mrh
   DB_DATABASE=gym_management
   DATABASE_URL="postgresql://postgres:mrh@localhost:5432/gym_management"
   ORIGIN=http://localhost:3001
   ```

4. **Set Up PostgreSQL Database**:

   - Ensure that PostgreSQL is installed and running on your system.
   - Create a new database:

     ```sql
     CREATE DATABASE gym_management;
     ```

5. **Run Migrations (If using Prisma or Sequelize)**:

   Apply migrations to set up the database tables:

   ```bash
   npx prisma migrate deploy
   ```

   _or if using Sequelize:_

   ```bash
   npx sequelize db:migrate
   ```

6. **Run the Server**:

   Start the Node.js server:

   ```bash
   npm run dev
   ```

   The server should now be running at [http://localhost:3000](http://localhost:3000).

### API Documentation

| Method | Endpoint                       | Description                              |
|--------|---------------------------------|------------------------------------------|
| POST   | `/auth/register`                | Register a new user                      |
| POST   | `/auth/login`                   | Login to the system                      |
| GET    | `/trainee/profile`              | Get the trainee's profile                |
| PUT    | `/trainee/update-profile`       | Update the trainee's profile             |
| POST   | `/trainee/book-class`           | Book a class schedule                    |
| DELETE | `/trainee/cancel-booking/:id`   | Cancel a booking                         |
| GET    | `/admin/trainers`               | Get all trainers                         |
| POST   | `/admin/trainers`               | Create a new trainer                     |
| PUT    | `/admin/trainers/:id`           | Update a trainer's details               |
| DELETE | `/admin/trainers/:id`           | Delete a trainer                         |
| POST   | `/admin/schedule-class`         | Schedule a new class                     |
| GET    | `/trainer/classes`              | Get all classes assigned to a trainer    |

### Testing

You can run tests (if applicable) with:

```bash
npm test
```

### Environment Variables

- **`PORT`**: The port number on which the server will run. Default is `3000`.
- **`JWT_SECRET`**: Secret key used to sign JWT tokens for authentication.
- **`DB_HOST`**: The host of your PostgreSQL database. Default is `localhost`.
- **`DB_PORT`**: The port for PostgreSQL. Default is `5432`.
- **`DB_USERNAME`**: The username for connecting to PostgreSQL.
- **`DB_PASSWORD`**: The password for PostgreSQL connection.
- **`DB_DATABASE`**: The name of the PostgreSQL database (e.g., `gym_management`).
- **`DATABASE_URL`**: Full PostgreSQL connection string, used by Prisma or other ORM.
- **`ORIGIN`**: The allowed origin for CORS requests (typically your frontend URL).

### License

This project is licensed under the MIT License.

