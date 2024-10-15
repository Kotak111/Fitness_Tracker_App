# Fitness Tracker Backend

## Objective
The Fitness Tracker Backend provides a secure and efficient API for managing user data, workout logs, and goal tracking. This backend is designed to support user authentication, workout management, and statistical analysis of fitness activities.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Security](#security)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)


## Features
- **User Authentication**: JWT-based authentication with Admin and User roles.
- **Workout Management**: CRUD API for logging workouts and managing goals.
- **Statistics Generation**: Generate and visualize workout statistics by date range, activity type, and goal achievement.
- **Admin Functions**: Admin endpoints to manage users and fitness programs.



   ## Expense Swagger UI
   
   ![Expense Dashboard](./images/fit1.png.png)
   <br>
   ![Expense Dashboard](./images/fit2.png.png)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)


### Setup .env file

```bash
DATABASE_URL=Your_mongo_url
PORT=Sevice_port
NODE_ENV=NODE_ENVIRINMENT
JWT_SECRET=jwt_secret
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm start
```
