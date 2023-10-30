#  Finance Management System - Backend Challenge | Module 3

This is a Backend Challenge project, part of Module 3, aimed at creating a RESTful API for a finance management system called "Dindin." The API allows for the following operations:

1. Register User
2. Login
3. View Logged-In User Profile
4. Edit Logged-In User Profile
5. List Categories
6. List Transactions
7. View Transaction Details
8. Add Transaction
9. Edit Transaction
10. Remove Transaction

In addition, the project includes extra features such as obtaining transaction statements and filtering transactions by category. 
Please note that the project also requires token-based authentication for most of its features.
This is a challenging project that meets strict security and functionality requirements for a financial management system. Feel free to contribute, suggest improvements, or use it as a reference for your own projects.

### Languages and Tools

- SQL
- Node.js
- Javascript
- Vscode
- Express.js
- PostgreSQL
- JWT
- Node Package Manager
- Beekeeper
- Insomnia

## Important Requirements:

1. The API accesses a PostgreSQL database named "dindin" with tables for users, categories, and transactions.
2. The API follows RESTful principles and ensures that each user can only access and manipulate their own data and transactions.
3. All error responses from the API include appropriate status codes and explanatory messages.
4. Monetary values are represented in cents (e.g., $10.00 = 1000).
5. The project is well-organized with files for routing, controllers, and database connection.

### Supported Status Codes:

- 200 (OK)
- 201 (Created)
- 204 (No Content)
- 400 (Bad Request)
- 401 (Unauthorized)
- 403 (Forbidden)
- 404 (Not Found)

### Contribute to the Project

- Fork the project.
- Make the necessary modifications.
- Create a Pull Request (PR).

### Key Endpoints:

- [x] /usuario: Register User
- [x] /login: Login
- [x] /transacao/:id: View a logged-in user's transaction details
- [x] /transacao: Add a transaction for the logged-in user

<a href="https://github.com/lgalbuquerque)">
</a>
