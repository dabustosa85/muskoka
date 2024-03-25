# Veterinary Hospital Management System

This project is a web application designed to manage appointments, users, and surveys for a veterinary hospital. It includes features for user registration, appointment scheduling, survey creation, and user management.

## Features

- **User Registration**: Allows new users to register for an account with the veterinary hospital.
- **Login**: Provides a login interface for users to access their accounts.
- **Appointment Scheduling**: Enables users to schedule appointments for their pets with the hospital.
- **Survey Creation**: Allows users to fill out surveys about their pets' health and behavior.
- **User Management**: Provides administrative tools for managing user accounts.

## Dependencies

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **bcrypt**: Library for hashing passwords.
- **crypto**: Built-in Node.js module for cryptographic functions.
- **EJS**: Embedded JavaScript templates for rendering views.
- **dotenv**: Loads environment variables from a .env file.
- **express-session**: Middleware for managing session data.
- **connect-mongo**: MongoDB session store for Express.
- **morgan**: HTTP request logger middleware.
- **nodemon**: Utility for automatically restarting the server during development.
- **Bootstrap**: Front-end framework for responsive web design.
- **Font Awesome**: Icon toolkit.
- **jQuery**: JavaScript library for DOM manipulation.
- **moment**: Library for parsing, validating, manipulating, and formatting dates and times.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/dabustosa85/muskoka.git
    ```

2. Navigate to the project directory:

    ```bash
    cd muskoka
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project root and configure environment variables:

    ```plaintext
    PORT=3000
    DB_USERNAME=muskokaUser
    DB_PASSWORD=gPaJuBEgVlwZguoE
    DB_HOST=comp2106.hc9ht8r.mongodb.net
    DB_NAME=muskoka
    DB_OPTIONS=retryWrites=true&w=majority&appName=comp2106
    SESSION_SECRET=secret_muskoka
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. Register for an account using the "Become a Client" page.
2. Log in to access the appointment scheduling and survey features.
3. Schedule appointments for your pets and fill out surveys as needed.
4. Administrators can manage user accounts and appointments through the backend interface.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Routes

- **GET /**: Displays the home page.
- **GET /home**: Displays the home page.
- **GET /become-a-client**: Displays the "Become a Client" page.
- **GET /request-appointment**: Displays the appointment request form.
- **POST /request-appointment**: Handles the appointment request form submission.
- **GET /survey**: Displays the survey page.
- **GET /backend/login**: Displays the backend login page.
- **POST /backend/login**: Handles the backend login form submission.
- **GET /backend**: Displays the backend home page.
- **POST /register**: Handles user registration.
- **GET /backend/appointments/create**: Displays the appointment creation form in the backend.
- **GET /backend/appointments**: Displays all appointments in the backend.
- **GET /backend/appointments/:id**: Displays details of a specific appointment in the backend.
- **POST /backend/appointments**: Handles appointment creation in the backend.
- **POST /backend/appointments/delete/:id**: Handles appointment deletion in the backend.
- **GET /backend/users/create**: Displays the user creation form in the backend.
- **GET /backend/users**: Displays all users in the backend.
- **GET /backend/users/:id**: Displays details of a specific user in the backend.
- **GET /backend/users/edit/:id**: Displays the user edit form in the backend.
- **POST /backend/users**: Handles user creation in the backend.
- **POST /backend/users/:id**: Handles user update in the backend.
- **POST /backend/users/delete/:id**: Handles user deletion in the backend.
