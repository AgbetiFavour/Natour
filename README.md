# Natours API Documentation

Welcome to the **Natours API** documentation. This API provides endpoints for managing tours, users, bookings, and reviews. The API follows RESTful principles and requires authentication for specific routes.

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Users](#users)
  - [Tours](#tours)
  - [Bookings](#bookings)
  - [Reviews](#reviews)
- [Error Handling](#error-handling)

---

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/natours-api.git
   cd natours-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set environment variables:
   ```bash
   NODE_ENV=development
   PORT=3000
   DATABASE=mongodb://localhost:27017/natours
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## Authentication
This API uses **JWT (JSON Web Token)** authentication. To access protected routes, include the token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

To get a token, log in using the `/api/v1/users/login` endpoint.

---

## Endpoints

### Users

#### Register a new user
`POST /api/v1/users/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "passwordConfirm": "securepassword"
}
```

**Response:**
Returns user details and authentication token.

---

#### Login a user
`POST /api/v1/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
Returns user details and authentication token.

---

#### Get current user profile (Authenticated)
`GET /api/v1/users/me`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
Returns the logged-in user's details.

---

### Tours

#### Get all tours
`GET /api/v1/tours`

**Response:**
Returns a list of all tours.

---

#### Get a tour by ID
`GET /api/v1/tours/:id`

**Params:**
- `id`: Tour ID

**Response:**
Returns details of a specific tour.

---

#### Create a new tour (Admin Only)
`POST /api/v1/tours`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Beautiful Beach Tour",
  "duration": 5,
  "difficulty": "easy",
  "price": 299
}
```

**Response:**
Returns the created tour details.

---

#### Update a tour (Admin Only)
`PATCH /api/v1/tours/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Params:**
- `id`: Tour ID

**Request Body:**
```json
{
  "price": 399
}
```

**Response:**
Returns the updated tour details.

---

### Bookings

#### Book a tour (Authenticated)
`POST /api/v1/bookings`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Request Body:**
```json
{
  "tour": "tour_id",
  "user": "user_id",
  "price": 299
}
```

**Response:**
Returns booking details.

---

### Reviews

#### Create a review (Authenticated)
`POST /api/v1/reviews`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Request Body:**
```json
{
  "tour": "tour_id",
  "user": "user_id",
  "review": "Amazing tour! Highly recommend.",
  "rating": 5
}
```

**Response:**
Returns the created review details.

---

## Error Handling
Errors are returned in the following format:
```json
{
  "status": "fail",
  "message": "Invalid credentials"
}
```

Common HTTP status codes:
- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found

---

