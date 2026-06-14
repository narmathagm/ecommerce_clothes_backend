# Ecommerce Clothes Backend

Backend API for the Ecommerce Clothes project. This project uses Node.js, Express, TypeScript, MySQL, Sequelize, JWT authentication, role-based access control, and Swagger API documentation.

## Versions Used

- Node.js: v25.9.0
- npm: v11.12.1
- Express: 5.2.1
- IDE: Visual Studio Code
- Database tools: MySQL and MySQL Workbench

## Requirements

Install these before running the project:

- Node.js
- npm
- MySQL Server
- MySQL Workbench
- Visual Studio Code

## Project Setup

Clone the backend project into your system and open the backend folder in VS Code.

```bash
cd ecommerce_clothes_backend
npm install
```

You can also use:

```bash
npm i
```

This command installs all packages used in the backend project.

## Database Setup

Use MySQL Workbench to create and prepare the database.

1. Open MySQL Workbench.
2. Run `database/initialDatabase.sql` to create the database tables.
3. Run `database/masterDatas.sql` to insert the master data.
4. Check the database credentials in the `.env` file.
5. If the MySQL password in `.env` does not match your local MySQL password, update it.

Common `.env` values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_clothes
```

## Run Backend

```bash
npm run dev
```

After running the command, the backend should show messages like:

```text
Database connected successfully.
Server running at http://localhost:5000
Swagger at http://localhost:5000/api-docs
```

## Swagger API Testing

Use Swagger to test the backend APIs:

```text
http://localhost:5000/api-docs
```

## Folder Structure

- `src/config`: database configuration.
- `src/controllers`: API controller logic.
- `src/dtos`: request and response data types.
- `src/middlewares`: authentication, authorization, and upload middleware.
- `src/models`: Sequelize database models.
- `src/routes`: API route registration.
- `src/services`: business logic for auth, users, products, categories, and cart.
- `src/swagger`: generated Swagger documentation.
- `src/validations`: Joi validation schemas.
- `database`: SQL files for table creation, master data, and stored procedures.
- `public/uploads`: uploaded product images.

## AI Tool Usage

For role-based access understanding, maintenance, and implementation support, AI tools such as Codex and GitHub Copilot were used. GitHub Copilot was also used to help create test files for testing backend APIs.
