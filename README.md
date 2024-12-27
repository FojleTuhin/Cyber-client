# Cyber Security Project: Dual Encryption System

## Project Overview

This project demonstrates a robust cyber security implementation using two distinct encryption algorithms: RSA (Rivest–Shamir–Adleman) for user authentication and Autokey Cipher for data storage and retrieval. The application provides a secure platform for user signup, login, and data management, showcasing practical applications of cryptographic techniques in web development.

## Technologies Used

- **Frontend**: Next.js (React framework)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Encryption**: RSA (for authentication) and Autokey Cipher (for data)

## Key Features

1. **Secure User Authentication**
   - Implements RSA encryption for signup and login processes
   - Ensures password security during transmission and storage

2. **Encrypted Data Management**
   - Uses Autokey Cipher for encrypting and decrypting user data
   - Provides a secure method for storing and retrieving sensitive information

3. **Full-Stack Implementation**
   - Utilizes Next.js for a responsive and efficient frontend
   - Employs Node.js and Express for a robust backend API
   - Integrates MongoDB for secure and scalable data storage

## Encryption Algorithms

### RSA (Rivest–Shamir–Adleman)
- Used for secure user authentication (signup and login)
- Provides public-key cryptography, ensuring secure transmission of user credentials
- Implemented using Node.js `crypto` module

### Autokey Cipher
- Employed for encrypting and decrypting user data
- A polyalphabetic substitution cipher that uses the message itself as the key
- Custom implementation for educational purposes and demonstration of classical cryptography

## Project Structure

- `/pages`: Next.js pages including the main application interface
- `/components`: React components for UI elements
- `/utils`: Utility functions including encryption algorithms
- `/api`: Express.js API routes for handling backend operations
- `/models`: MongoDB schemas for data structure

## Security Considerations

- RSA keys are generated on the client-side for each session
- Passwords are never stored or transmitted in plain text
- All data stored in the database is encrypted
- Server-side validation is implemented to prevent injection attacks

## Setup and Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB and update the connection string in the environment variables
4. Run the development server: `npm run dev`
5. Access the application at `http://localhost:3000`

## Note

This project is for educational purposes and demonstrates the implementation of cryptographic algorithms in a web application. For production use, consider using well-established libraries and consult with security experts.
