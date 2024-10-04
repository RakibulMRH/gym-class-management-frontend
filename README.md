# Gym Class Management Frontend

This is the frontend for the **Gym Class Scheduling and Membership Management System**. It is built with **Next.js**, **Redux Toolkit**, and **Tailwind CSS**. The system allows Admins, Trainers, and Trainees to manage gym operations such as scheduling, trainer management, class booking, and profile management.

## Project Overview

This frontend provides the user interface for three types of users:
- **Admin**: Manage trainers, schedule classes, and assign trainers to those classes.
- **Trainer**: View assigned class schedules.
- **Trainee**: Manage their profile, book classes, and cancel bookings.

The backend of the system is built with Node.js and Express, and you can find the repository here: [Gym Class Management Backend](https://github.com/RakibulMRH/gym-class-management-backend).

## Technology Stack

- **Programming Language**: TypeScript/JavaScript
- **Framework**: Next.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API Integration**: Axios for API requests
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Git](https://git-scm.com/)
- [Backend Server](https://github.com/RakibulMRH/gym-class-management-backend) running locally or deployed.

### Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/RakibulMRH/gym-class-management-frontend.git
   cd gym-class-management-frontend
   ```

2. **Install Dependencies**:

   After cloning the repository, install the project dependencies:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:

   In the root of the project, create a `.env.local` file and add the following environment variables:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/ # Or use the deployed backend URL
   ```

   If your backend is deployed (e.g., on Railway or Heroku), replace `http://localhost:3000/api/` with your **deployed backend URL**:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api/
   ```

4. **Run the Development Server**:

   To start the development server, run:

   ```bash
   npm run dev
   ```

   The frontend should now be running at [http://localhost:3001](http://localhost:3001).

### Connecting Backend and Frontend

In the backend `.env` file, make sure to update the `ORIGIN` environment variable to allow requests from your frontend:

```bash
ORIGIN=http://localhost:3001
```

If your frontend is deployed, replace it with the deployed frontend URL, such as:

```bash
ORIGIN=https://your-frontend-url.com
```

### Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready frontend.
- `npm start`: Runs the built application.
- `npm run lint`: Runs the linter to check for code quality.

### Folder Structure

```bash
.
├── components       # Reusable UI components
├── pages            # Page components (routes)
├── slices           # Redux slices for state management
├── styles           # Tailwind CSS styles
├── public           # Public assets (images, etc.)
├── .env.local       # Environment variables file
└── README.md        # This file
```

### API Integration

- The API base URL is defined in the `NEXT_PUBLIC_API_BASE_URL` environment variable.
- Axios is used for making HTTP requests to the backend.

Ensure the backend server is running locally or deployed properly for the frontend to communicate with it.

### Key Features

- **Authentication**: Login and registration pages with JWT-based authentication.
- **Admin Dashboard**: Manage trainers, schedule classes, and assign trainers to those classes.
- **Trainer Dashboard**: View the assigned class schedules.
- **Trainee Dashboard**: Manage profile, book classes, and cancel bookings.
- **Role-based Routing**: Protected routes based on the roles (admin, trainer, trainee).

### License

This project is licensed under the MIT License.
