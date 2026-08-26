# Student API

A simple REST API built with Node.js and Express for managing student records. This project demonstrates CRUD operations, query filtering, validation, and basic API response handling.

## Features

- Get all students
- Get a single student by ID
- Create a new student
- Update an existing student using PATCH
- Delete a student
- Filter students by department and minimum marks
- Input validation for required fields and valid marks

## Tech Stack

- Node.js
- Express.js
- JavaScript

## Project Structure

```text
student-api/
├── server.js
├── package.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or above recommended)
- npm

## Installation

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

## Run the Server

Start the API with:

```bash
npm start
```

The server will run on:

```text
http://localhost:3000
```

## API Endpoints

### 1) Get all students

```http
GET /api/students
```

Optional query parameters:

- `department`: filter by department
- `minMarks`: return students with marks greater than or equal to the value

Examples:

```bash
curl "http://localhost:3000/api/students"
curl "http://localhost:3000/api/students?department=CSE"
curl "http://localhost:3000/api/students?minMarks=80"
curl "http://localhost:3000/api/students?department=CSE&minMarks=80"
```

### 2) Get a student by ID

```http
GET /api/students/:id
```

Example:

```bash
curl http://localhost:3000/api/students/1
```

### 3) Create a new student

```http
POST /api/students
```

Request body:

```json
{
    "name": "Neha",
    "marks": 88,
    "department": "CSE"
}
```

Example:

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Neha","marks":88,"department":"CSE"}'
```

### 4) Update a student

```http
PATCH /api/students/:id
```

Example:

```bash
curl -X PATCH http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"marks":95}'
```

### 5) Delete a student

```http
DELETE /api/students/:id
```

Example:

```bash
curl -X DELETE http://localhost:3000/api/students/1
```

## Validation Rules

- `name` must be a non-empty string
- `department` must be a non-empty string
- `marks` must be a number between 0 and 100
- `id` must be a valid numeric value

## Example Response

### Successful student creation

```json
{
    "message": "Student created successfully",
    "student": {
        "id": 3,
        "name": "Neha",
        "marks": 88,
        "department": "CSE"
    }
}
```

### Error response

```json
{
    "message": "Marks must be between 0 and 100"
}
```

## Notes

- This project uses an in-memory array, so data is lost when the server restarts.
- It is intended as a beginner-friendly REST API example for learning backend development.

## License

This project is licensed under the ISC License.
