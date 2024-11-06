# Authify

This project is a Node.js-based REST API built with Express.js and TypeScript. It provides
authentication with SMS-based 2FA, user management, and request handling using PostgreSQL and
TypeORM. The application is containerized with Docker and includes environment configurations, error
handling, and logging.

## Features

- User Authentication: Supports SMS-based 2FA with sign-up, login, and password reset.
- User Management: Allows users to update personal information.
- Request Handling: Manages user requests with verification and expiration capabilities.
- Health Check: Endpoint to monitor server health.
- Error Logging: Centralized logging with winston for debugging and tracking errors

## Setup and Installation

1. Ensure you have GNU Make, Docker Desktop and Nodejs Installed
2. Clone the repo
3. Run `npm install`
4. Rename .env.example file to .env

## Running the Project

### Development

To run the development environment with hot-reloading, run `make dev`

### Production

To run the development environment with hot-reloading, run `make prod`

## Database Migrations

This project uses TypeORM for migrations. To create and run migrations, use the following commands:

### Generate Migration

```bash
make gen_migration name=<migration-name>
```

### Run Migration

```bash
    make run_migration
```

## API Documentation

### Health Check

**Endpoint:** `GET /api/v1/health`

**Description:** Check the health status of the server.

**Example Request:**

```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Response:**

```json
{
  "status": "healthy",
  "database": "connected",
  "message": "server is healthy",
  "timestamp": "2023-10-30T12:34:56.789Z"
}
```

### User Signup

**Endpoint:** `POST /api/v1/auth/signup`

**Description:** Register a new user with a mobile number, email, and password.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup -H "Content-Type: application/json" -d '{ "mobile": "+1234567890", "email": "user@example.com", "password": "securepassword", "name": "John Doe" }'
```

**Response:**

```json
{
  "error": false,
  "message": "signup successful ;we have sent you a verification code",
  "data": null
}
```

### Verify Signup

**Endpoint:** `POST /api/v1/auth/signup/verify`

**Description:** Verify the account with a code sent to the user's mobile.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup/verify \
-H "Content-Type: application/json" \
-d '{ "mobile": "+1234567890", "code": "44397988" }'
```

**Response:**

```json
{
  "error": false,
  "message": "Account verified successfully",
  "data": null
}
```

### Login

**Endpoint:** `POST /api/v1/auth/login`

**Description:** Initiate login for a user.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{ "mobile": "+1234567890", "password": "securepassword" }'
```

**Response:**

```json
{
  "error": false,
  "message": "we have sent you a 2FA code for verifying this login attempt",
  "data": null
}
```

### Verify Login

**Endpoint:** `POST /api/v1/auth/login/verify`

**Description:** Verify the login attempt with a code.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login/verify \
-H "Content-Type: application/json" \
-d '{ "mobile": "+1234567890", "code": "123456" }'
```

**Response:**

```json
{"error":false,"message":"Login successful","data":{"token":"<token>"}}%
```

### Initiate Password Reset

**Endpoint:** `POST /api/v1/auth/passwords/reset`

**Description:** Request a password reset for a user.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/passwords/reset \
-H "Content-Type: application/json" \
-d '{ "mobile": "+1234567890" }'
```

**Response:**

```json
{ "error": false, "message": "Password reset code sent successfully", "data": null }
```

### Verify Password Reset

**Endpoint:** `POST /api/v1/auth/passwords/reset/verify`

**Description:** Complete the password reset using a verification code and new password.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/passwords/reset/verify \
-H "Content-Type: application/json" \
-d '{ "mobile": "+1234567890", "password": "newsecurepassword", "code": "123456" }'
```

**Response:**

```json
{ "error": false, "message": "Password has been reset successfully", "data": null }
```

### Get User Profile

**Endpoint:** `GET /api/v1/users/me`

**Description:** Retrieve the profile of the authenticated user.

**Example Request:**

```bash
curl -X GET http://localhost:3000/api/v1/users/me \
-H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "error": false,
  "message": "found",
  "data": {
    "id": "e1fa070f-375d-4fdf-8c6c-86c3970a4ff4",
    "mobile": "+1234567890",
    "name": "John Doe",
    "email": "user@example.com",
    "isVerified": true,
    "createdAt": "2024-11-06T08:34:02.150Z",
    "updatedAt": "2024-11-06T08:34:02.150Z"
  }
}
```

### Update User Profile

**Endpoint:** `GET /api/v1/users/me`

**Description:** Retrieve the profile of the authenticated user.

**Example Request:**

```bash
curl -X PATCH http://localhost:3000/api/v1/users/me \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{ "name": "Jane Doe", "email": "newemail@example.com" }'
```

**Response:**

```json
{
  "error": false,
  "message": "Profile updated successfully",
  "data": {
    "id": "e1fa070f-375d-4fdf-8c6c-86c3970a4ff4",
    "mobile": "+1234567890",
    "name": "Jane Doe",
    "email": "newemail@example.com",
    "isVerified": true,
    "createdAt": "2024-11-06T08:34:02.150Z",
    "updatedAt": "2024-11-06T08:34:02.150Z"
  }
}
```
