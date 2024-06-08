# Founder Finder Backend

Finding a co-founder is hard, we provide you with the platform to make that easier. Building a start-up is hard work. It is a journey to create something new and it takes believing in a dream each and every day, often against all odds.

Finding a co-founder is one of the most difficult parts of the process. The goal is to find someone that completes you, someone that will share the burdens and the joys along the way. 

This repository contains the code for the server-side of the application, built using Node.js, Express, and MongoDB.

- Deployed live version: [Live demo](https://founder-finder.vercel.app/)

- Deployed API: https://founder-finder-api.adaptable.app/

- Frontend Repo: https://github.com/donxito/founder-finder-client


## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **API Endpoints**: Provides RESTful APIs for frontend interaction, including user authentication and managing startup data.
- **Database Integration**: Uses MongoDB as the database to store user information and startup data.
- **Security**: Implements measures such as password hashing and JWT-based authentication for security.

## Technologies Used

- Node.js: JavaScript runtime for server-side development.
- Express: Web framework for building APIs and handling HTTP requests.
- MongoDB: NoSQL database for storing application data.
- Mongoose: MongoDB object modeling for Node.js.
- JWT: JSON Web Tokens for user authentication.
- bcrypt: Library for hashing passwords.

## Getting Started

1. Clone the repository:

git clone <backend-repo-url>
cd founder-finder-backend

2. Install dependencies:

npm install

3. Set up environment variables:

   - Create a `.env` file based on the `.env.example` file.
   - Add your MongoDB connection URI and JWT secret key.

4. Run the server:

npm start

5. The server will start at the specified port (default is 5000).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
