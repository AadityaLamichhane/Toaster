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
