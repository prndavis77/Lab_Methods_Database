Lab Methods Database

A full-stack application for managing laboratory analytical methods, such as HPLC and GC methods. This app allows users to register, log in, and manage laboratory methods, including adding, viewing, editing, and deleting methods. It also supports search and filtering capabilities.
Features

    User Authentication: Register and log in to access the database.
    CRUD Operations: Create, read, update, and delete methods for HPLC and GC instruments.
    Search and Filter: Filter and sort methods by name, creation date, or other relevant parameters.
    Pagination: Supports paginated views for easy browsing.

Technologies Used

    Backend: Node.js, Express, Sequelize, PostgreSQL (or other SQL database)
    Frontend: React, Ant Design (for UI components), Axios (for API requests)
    Authentication: JWT-based authentication

Prerequisites

    Node.js (version 12 or later)
    npm or Yarn
    PostgreSQL (or another SQL database)
    Git

Getting Started
1. Clone the Repository

git clone https://github.com/prndavis77/Lab_Methods_Database.git
cd Lab_Methods_Database

2. Install Dependencies
Backend

Navigate to the backend directory and install dependencies:

cd backend
npm install

Frontend

In a new terminal, navigate to the frontend directory and install dependencies:

cd frontend
npm install

3. Set Up Environment Variables
Backend (.env)

In the backend directory, create a .env file with the following content:

PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_connection_url

Replace your_jwt_secret with a secure string and your_database_connection_url with your database connection string.
Frontend (.env)

In the frontend directory, create a .env file with the following content:

REACT_APP_API_URL=http://localhost:5000

4. Set Up the Database

    Ensure PostgreSQL (or your chosen database) is running.

    Initialize the database and apply migrations using Sequelize CLI:

    cd backend
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all # Seed initial data if needed

5. Run the Application
Backend

In the backend directory, start the server:

npm start

The server will run on http://localhost:5000.
Frontend

In the frontend directory, start the React development server:

npm start

The frontend will run on http://localhost:3000.
6. Access the Application

Open your browser and go to http://localhost:3000.
Usage

    Registration and Login: Register a new account or log in with an existing account.
    View Methods: Users can view and search for methods in the database.
    Add/Edit Methods: Users can add and edit analytical methods once logged in.
    Delete Methods: Users can delete methods as needed.

API Endpoints

Here’s an overview of some core API endpoints:
Authentication

    POST /auth/register: Register a new user.
    POST /auth/login: Log in to get a JWT token.

Methods

    GET /methods: Get all methods.
    GET /methods/search: Search, filter, and paginate methods.
    POST /methods: Add a new method (requires authentication).
    PUT /methods/:id: Edit a method (requires authentication).
    DELETE /methods/:id: Delete a method (requires authentication).

Contributing

    Fork the repository.
    Create a new feature branch (git checkout -b feature/your-feature-name).
    Commit your changes (git commit -m "Add new feature").
    Push to the branch (git push origin feature/your-feature-name).
    Create a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For questions or issues, please contact prndavis@gmail.com.
