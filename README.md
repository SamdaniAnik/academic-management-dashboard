# Academic Management Dashboard

This is a simple guide to run Academic Management Dashboard application. The application is built using Next JS.

## Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/)
- Database system (MySQL)

## Steps

1. Clone the repository\*\*
   ```bash
   git clone <https://github.com/SamdaniAnik/academic-management-dashboard.git>
   cd academic-management-dashboard
   ```
2. Create a database named academic_management_dashboard
   ```bash
   mysql -u root -p
   CREATE DATABASE academic_management_dashboard;
   ```
3. dump the database
   ```bash
    mysql -u root -p academic_management_dashboard < db/academic_management_dashboard.dump
   ```
4. Run the following command to install the dependencies
   ```bash
   npm install
   ```
5. Run the following command to start the application
   ```bash
   npm run dev
   ```
6. The application will be running on `http://localhost:3000`
