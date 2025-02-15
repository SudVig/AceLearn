# Project Setup Guide

This guide provides step-by-step instructions to set up and run the project, which comprises a Spring Boot backend and a React frontend.

## Prerequisites

- **MySQL**: Ensure MySQL is installed on your system.
- **IntelliJ IDEA**: Recommended for backend development.
- **Visual Studio Code (VSCode)**: Recommended for frontend development.
- **Node.js and npm**: Required for the React frontend.
- **Python**: Ensure Python is installed for backend operations.
-  set your database username : root
-  set your database password : root

## 1. Database Configuration

1. **Create the Database**:
   - Open your MySQL workbenh
     ```sql
     CREATE DATABASE management_system;
     ```
   - This command creates a new database named `management_system`.



## 2. Backend Setup (Spring Boot)

1. **Open Backend in IntelliJ IDEA**:
   - Navigate to the `AceLearn/backend` directory.
   - Open this directory in IntelliJ IDEA.

2. **Configure Database Connection**:
   - In the `src/main/resources` directory, locate the `application.properties` file.
   - Configure the database connection properties:
     ```
     spring.datasource.url=jdbc:mysql://localhost:3306/management_system
     spring.datasource.username=root
     spring.datasource.password=your_password
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
     ```
   - Replace `your_password` with the password you set for the `root` user.

3. **Run the Spring Boot Application**:
   - In IntelliJ IDEA, run the `main` method in the main application class (usually annotated with `@SpringBootApplication`).
   - Ensure the application starts without errors and connects to the `management_system` database.

## 3. Frontend Setup (React)

1. **Open Project in VSCode**:
   - Open the entire project directory in Visual Studio Code.

2. **Backend (Django) Setup**:
   - Open a terminal in VSCode.
   - Navigate to the `backend-lexor` directory:
     ```bash
     cd backend-lexor
     ```
   - Run the Django development server:
     ```bash
     python manage.py runserver
     ```
   - Ensure the server starts without errors.

3. **Frontend Setup**:
   - Open another terminal in VSCode.
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install the necessary npm packages:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```
   - The React application should now be running, typically accessible at `http://localhost:3000`.

## Notes

- Ensure that the backend servers (both Spring Boot and Django) are running before starting the React frontend to avoid any API connection issues.
- If you encounter any issues during setup or execution, consult the respective documentation for Spring Boot, Django, and React, or seek assistance from the development community.

By following these steps, you should have the project up and running successfully.
