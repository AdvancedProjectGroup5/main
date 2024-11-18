# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


======================
## Modified on 12.Nov
# Movie App Project

## Project Overview
This is a movie-based web application where users can search for movies, view showtime, and join groups. The project consists of a frontend (React) and a backend (Node.js + Express), with a PostgreSQL database.

## Directory Structure

```plaintext
    main/
    ├── public/                   # Public resources for the frontend
    ├── src/                      # Frontend code
    │   ├── assets/               # Static assets like images
    │   ├── components/           # Reusable React components
    │   ├── context/              # Context API files
    │   ├── screens/              # Page-level components
    │   ├── App.js                # Main app component
    │   └── index.js              # Entry point for frontend
    ├── server/                   # Backend code and API documentation configuration
    │   ├── api-doc/              # Swagger API documentation configuration
    │   │   └── swaggerConfig.js  # Swagger configuration file
    │   ├── config/               # Database configuration and environment variables
    │   │   └── movie.sql         # SQL scripts
    │   ├── controllers/          # Business logic controllers
    │   ├── middlewares/          # Middleware functions
    │   ├── models/               # Database models
    │   ├── routes/               # API route definitions
    │   ├── app.js                # Main Express application file
    │   ├── index.js              # Server entry point
    │   ├── reportWebVitals.js    # Web vitals report file for performance metrics
    │   ├── setupTests.js         # Jest setup file for initializing testing environment
    │   ├── package.json          # Backend dependencies and scripts
    │   └── package-lock.json     # Backend dependency lock file
    ├── .env                      # Environment variables file
    ├── .gitignore                # Git ignore file
    ├── package.json              # Project configuration and dependencies
    ├── package-lock.json         # Frontend dependency lock file
    └── README.md                 # Project documentation
```

# Setup Guide

## Prerequisites

- **Node.js and npm**: Ensure you have the latest version of [Node.js](https://nodejs.org/) installed.
- **PostgreSQL**: Ensure the database is installed and set up. Create a new database for this project.

## 1. Backend Setup (`server` Directory)

1. **Navigate to the `server` folder**:
   ```bash
   cd server
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables: In the `server` folder, create a `.env` file and add the following variables (update values as needed)**:
    ```plantext
    # Server configuration
   PORT=3001
   
   # Database configuration
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASSWORD=your_pswd
   DB_PORT=5432
   TEST_DB_NAME=your_test_database_name
   
   # JWT Secret Key
    JWT_SECRET=your_jwt_secret
   
    TMDB_API_KEY=your_tmdb_api_key
    FINNKINO_API_URL=https://www.finnkino.fi/xml
    ``` 

4. **Start the Backend Server**:
    ```bash
   npm run devStart
    ```
   Once the server is running, you can access the Swagger API documentation at `http://localhost:3001/api-docs`.

## 2. Frontend Setup (`Root` Directory)
1. **Create a `.env` file in the root directory for the frontend configuration, with the following content**:
    ```bash
    REACT_APP_API_URL=http://localhost:3000
    ```

## 3. Frontend Setup (`src` Directory)
1. **Navigate to the `src` folder**:
    ```bash
    cd src
    ```
   
2. **Install dependencies**:
    ```bash
   npm install
    ```

4. **Start the Frontend Development Server**:
    ```bash
   npm start
    ```





















