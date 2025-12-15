# API Documentation

This document provides a simplified overview of the User API endpoints for frontend development.

## Base URL

All API endpoints are relative to the base URL configured in the application.

## Authentication

Endpoints marked with `Authorization: Required` need a JSON Web Token (JWT) to be passed in the request header.

**Header Format:**
`Authorization: Bearer <your_jwt_token>`

---

## Users API

This section covers endpoints related to user management.

### 1. Register a New User

-   **Description:** Creates a new user account.
-   **Method:** `POST`
-   **Endpoint:** `/users`
-   **Authorization:** Not Required

-   **Request Body:**

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "yoursecurepassword"
    }
    ```

-   **Success Response (`201 Created`):**

    ```json
    {
      "status": "success",
      "message": "User registered successfully.",
      "data": {
        "user": {
          "id": "user-id-abc-123",
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        "token": "your_jwt_token"
      }
    }
    ```

### 2. User Login

-   **Description:** Authenticates a user and provides a JWT for session management.
-   **Method:** `POST`
-   **Endpoint:** `/users/login`
-   **Authorization:** Not Required

-   **Request Body:**

    ```json
    {
      "email": "john.doe@example.com",
      "password": "yoursecurepassword"
    }
    ```

-   **Success Response (`200 OK`):**

    ```json
    {
      "status": "success",
      "message": "Login successful.",
      "data": {
        "user": {
          "id": "user-id-abc-123",
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        "token": "your_jwt_token"
      }
    }
    ```

### 3. Get User Details

-   **Description:** Retrieves the details of a specific user by their ID.
-   **Method:** `GET`
-   **Endpoint:** `/users/{userId}`
-   **Authorization:** Required

-   **URL Parameters:**
    -   `userId` (string, required): The unique identifier of the user.

-   **Success Response (`200 OK`):**

    ```json
    {
      "status": "success",
      "data": {
        "user": {
          "id": "user-id-abc-123",
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    }
    ```

### 4. Update User Information

-   **Description:** Updates a user's profile information.
-   **Method:** `PATCH`
-   **Endpoint:** `/users/{userId}`
-   **Authorization:** Required

-   **URL Parameters:**
    -   `userId` (string, required): The unique identifier of the user.

-   **Request Body:** (Include only the fields that need to be updated)

    ```json
    {
      "name": "Johnathan Doe",
      "profileImage": "https://example.com/new-image.jpg"
    }
    ```

-   **Success Response (`200 OK`):**

    ```json
    {
      "status": "success",
      "message": "User updated successfully.",
      "data": {
        "user": {
          "id": "user-id-abc-123",
          "name": "Johnathan Doe",
          "email": "john.doe@example.com",
          "profileImage": "https://example.com/new-image.jpg"
        }
      }
    }
    ```

### 5. Change User PIN

-   **Description:** Allows a user to change their security PIN.
-   **Method:** `PATCH`
-   **Endpoint:** `/users/{userId}/pin`
-   **Authorization:** Required

-   **URL Parameters:**
    -   `userId` (string, required): The unique identifier of the user.

-   **Request Body:**

    ```json
    {
      "oldPin": "1234",
      "newPin": "5678"
    }
    ```

-   **Success Response (`200 OK`):**

    ```json
    {
      "status": "success",
      "message": "PIN changed successfully."
    }
    ```

## API Client Example

Here is an example of an API client to interact with the User API.

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Registers a new user.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The response data from the API.
 */
export const registerUser = async (name, email, password) => {
  const response = await api.post('/users', { name, email, password });
  return response.data;
};

/**
 * Logs in a user.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The response data from the API.
 */
export const loginUser = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
  }
  return response.data;
};

/**
 * Retrieves a user's information.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<object>} The response data from the API.
 */
export const getUser = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

/**
 * Updates a user's information.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updates - An object containing the user fields to update.
 * @returns {Promise<object>} The response data from the API.
 */
export const updateUser = async (userId, updates) => {
  const response = await api.patch(`/users/${userId}`, updates);
  return response.data;
};

/**
 * Changes a user's PIN.
 * @param {string} userId - The ID of the user.
 * @param {string} oldPin - The user's current PIN.
 * @param {string} newPin - The user's new PIN.
 * @returns {Promise<object>} The response data from the API.
 */
export const changePin = async (userId, oldPin, newPin) => {
  const response = await api.patch(`/users/${userId}/pin`, { oldPin, newPin });
  return response.data;
};
```