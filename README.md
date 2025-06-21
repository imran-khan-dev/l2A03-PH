# 📚 Library Management System

A robust and scalable RESTful API for managing library books and borrow operations, built with **Express.js**, **TypeScript**, and **MongoDB** (Mongoose). It supports CRUD operations for books, borrowing logic with availability control, and summary reporting using aggregation.

---

## 🚀 Features

### 📘 Book Management

- **Create a book** with full validation (`title`, `author`, `genre`, `isbn`, `copies`, etc.)
- **Read all books** with:
  - Filtering by genre
  - Sorting by fields (e.g., `createdAt`)
  - Result limiting
- **Get book by ID**
- **Update book**
- **Delete book**
- Automatic `available` status control based on `copies`

### 🔄 Borrow Management

- **Borrow a book**
  - Verifies book availability
  - Deducts quantity from `copies`
  - Marks `available = false` when no copies remain
- **Borrow Summary (Aggregation)**
  - Total quantity borrowed per book
  - Includes book `title` and `isbn`

### ⚙️ Built-In Logic

- Mongoose **static method** to update availability
- Mongoose **middleware** for borrow post-save operations
- Standardized **error handling format**
- Full **Zod validation** for request bodies

---

## 🧠 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Architecture**: Modular MVC-style with clean separation

---

## 📂 Project Structure

src/
├── app.ts # Express app setup
├── server.ts # Server entrypoint
└── app/
├── book/ # Book model, controller, routes, validation
├── borrow/ # Borrow model, controller, routes, logic
└── middleware/ # Global error handler

## 🔧 Getting Started

### 1. Clone the repository

git clone https://github.com/imran-khan-dev/l2A03-PH.git
cd library-management-api

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a .env file in the root:
MONGODB_URI=mongodb+srv://imrandev:XDWp88w34n9lvc4t@library.xlhtngc.mongodb.net/?retryWrites=true&w=majority&appName=library
PORT=5000

### 4. Run the project

For development (with hot reload):
npm run dev

For production:
npm run build
npm start

## 📫 API Endpoints Overview

### Book Routes

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/books`         | Create a book                |
| GET    | `/api/books`         | Get all books (filter, sort) |
| GET    | `/api/books/:bookId` | Get a book by ID             |
| PUT    | `/api/books/:bookId` | Update a book                |
| DELETE | `/api/books/:bookId` | Delete a book                |

### Borrow Routes

| Method | Endpoint      | Description                      |
| ------ | ------------- | -------------------------------- |
| POST   | `/api/borrow` | Borrow a book                    |
| GET    | `/api/borrow` | Get borrowed books summary (agg) |

## ❗ Error Response Format

{
"success": false,
"message": "Validation failed",
"error": "isbn must be a valid string"
}

## ✅ Future Improvements

Return/renew book system
Admin/user roles and authentication
Pagination for books and borrow list
Book category or shelf management

## 📄 License

This project is licensed under the MIT License.
