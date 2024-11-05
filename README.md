
# Authify

This project is a Node.js-based REST API built with Express.js and TypeScript. It provides authentication with SMS-based 2FA, user management, and request handling using PostgreSQL and TypeORM. The application is containerized with Docker and includes environment configurations, error handling, and logging.

## Features

* User Authentication: Supports SMS-based 2FA with sign-up, login, and password reset.
* User Management: Allows users to update personal information.
* Request Handling: Manages user requests with verification and expiration capabilities.
* Health Check: Endpoint to monitor server health.
* Error Logging: Centralized logging with winston for debugging and tracking errors

## Setup and Installation

1. Ensure you have GNU Make, Docker Desktop and Nodejs Installed
2. Clone the repo
3. Run `npm install`
4. Rename  .env.example file to .env

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

### Authentication

* POST /v1/auth/signup: Register a new user.
* POST /v1/auth/signup/verify: Verify user registration with an SMS code.
* POST /v1/auth/login: Request login with a mobile number.
* POST /v1/auth/login/verify: Verify login with an SMS code.
* POST /v1/auth/password/reset/request: Request a password reset.
* POST /v1/auth/password/reset: Reset password with verification.

### User Management

* GET /v1/users/me: Get the currently authenticated user’s information.
* PATCH /v1/users/me: Update authenticated user's name or email.

## Health Check

* GET /v1/health: Check if the server is up and running.

