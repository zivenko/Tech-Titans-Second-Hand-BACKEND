# Tech-Titans-Second-Hand-BACKEND Project

This is the backend for the **Tech-Titans Second-Hand** platform, a marketplace for buying and selling pre-owned tech products. The platform enables users to list their used items for sale, browse available products, 
and securely complete transactions.


## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yuriiSY/Tech-Titans-Second-Hand-BACKEND.git
```

### 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies:

```bash
cd Tech-Titans-Second-Hand-BACKEND
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory and add the required environment variables.

```bash
DB_HOST = 
PORT=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASSWORD=
```

### 4. Start the Server
To start the development server, run the following command:

```bash
npm run dev
```
This will start the server using nodemon which automatically restarts the server when changes are detected.

Alternatively, to run the server without nodemon:

```bash
npm start
```
