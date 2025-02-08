# UPI App

## Overview

This project is a UPI-like application built with Node.js, designed to handle user authentication, account management, and secure money transactions. The backend utilizes MongoDB for data storage, with sessions and transactions to ensure data consistency.

## Features

- **User Authentication:** Sign-in and login using JWT for secure session management.
- **Search Functionality:** Search for users in MongoDB based on their name.
- **Error Handling:** Robust error-handling middleware for smoother API responses.
- **User Profile Management:** Edit user details via dedicated endpoints.
- **Account Management:** View account balance securely.
- **Money Transfer:** Send money between users using MongoDB sessions and transactions to maintain data integrity.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (with Mongoose)**
- **JWT (JSON Web Tokens)**
- **Argon2 (for password hashing)**
- **Zod (for input validation)**
- **dotenv, cors, express-async-handler**

## Database Schemas

- **User Schema:** Stores user details such as name, email, password (hashed), and other personal information.
- **Account Schema:** Stores account-related details like balance, transaction history, and links to the corresponding user.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**\
   Create a `.env` file with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes (`/user`)

- `POST /signin` - Register a new user.
- `POST /login` - Authenticate a user and return a JWT.
- `GET /search?name=<username>` - Search for users by name.
- `PUT /edit` - Edit user details (requires authentication).

### Account Routes (`/account`)

- `GET /balance` - View account balance (requires authentication).
- `POST /transfer` - Send money to another user (uses MongoDB transactions).

## Contributing

Feel free to fork the project, make changes, and submit pull requests.

## License

This project is licensed under the ISC License.

