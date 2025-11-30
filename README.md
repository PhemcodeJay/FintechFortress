
# Neobank Financial - Setup Guide

## Overview

Neobank Financial is a high-performance, secure, and beautiful digital banking application prototype. This project is built with React, Tailwind CSS, and Wouter for the frontend, with an Express backend.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Usually comes with Node.js.

## Setup Instructions

### Windows

1.  **Open PowerShell or Command Prompt.**
2.  **Navigate to the project directory:**
    ```powershell
    cd path\to\project
    ```
3.  **Install dependencies:**
    ```powershell
    npm install
    ```
4.  **Build the application:**
    ```powershell
    npm run build
    ```

4.5  **Build the application:**
    ```powershell
   npm install --save-dev cross-env
   npm start
    ```

5.  **Start the application:**
    ```powershell
    npm start
    ```
    This will start the production server on `http://localhost:5000`.

### Linux / macOS

1.  **Open Terminal.**
2.  **Navigate to the project directory:**
    ```bash
    cd path/to/project
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Build the application:**
    ```bash
    npm run build
    ```
5.  **Start the application:**
    ```bash
    npm start
    ```
    This will start the production server on `http://localhost:5000`.

## Development Notes

- The application runs on port 5000.
- **Production mode**: Run `npm run build` followed by `npm start` to build and run the production version.
- **Development mode**: Run `npm run dev` for hot-reload development server.
- The project uses `wouter` for routing.
- Styling is handled by `tailwindcss`.
- Backend is built with Express and serves the frontend from the `dist` directory.

## Available Scripts

- `npm run build` - Builds both client and server for production
- `npm start` - Runs the production build
- `npm run dev` - Runs the development server with hot reload
- `npm run check` - Type-checks the TypeScript code

## Troubleshooting

- **Port in use**: If port 5000 is busy, you'll need to stop the process using that port or modify the port configuration.
- **Dependencies**: Ensure all dependencies are installed correctly. If you encounter errors, try deleting `node_modules` and running `npm install` again.
- **Build errors**: Make sure to run `npm run build` before `npm start` to ensure the latest code is compiled.
