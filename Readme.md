# TapNPay - An E-Wallet Payment Solution

TapNPay is a fully responsive e-wallet application that allows users to securely send and receive money. Built with a modern tech stack, combining **React.js** and **Tailwind CSS** for the frontend, **Node.js**, **Express.js**, and **MongoDB** for the backend, with **Zod** for robust input validation. The application ensures secure and atomic payment transactions using **MongoDB's native transaction** capabilities.


## Technical Description 📃

- **Responsive UI**: The frontend is built with `React.js` and designed to be fully responsive using `Tailwind CSS` for a modern, mobile-friendly experience. 

- **State Management**: Utilizes React's `Context API` for efficient and scalable state management across the application.

- **API Endpoints**: Built RESTful API endpoints with `Express.js` following MVC architecture for clean code organization. 

- **Database**: Designed and integrated `MongoDB` database schema using `Mongoose` ODM for efficient data modeling and relationships. 

- **Atomic Transactions**: All money transfers are performed using `MongoDB`'s native transaction feature to ensure atomicity and consistency of wallet balances. 

- **Pagination**: Implemented efficient pagination for user lists and transaction history, both on the backend (API) and frontend (UI), to handle large datasets smoothly. 

- **Authentication**: Implemented secure user authentication using `JWT` and `bcrypt.js` for password hashing. 

- **Navigation**: Utilized `React Router v6` for client-side routing with dynamic routes for seamless navigation.


## Key Features

- **User Registration and Login**: Secure signup and login with JWT-based authentication.
- **Profile Management**: View and update user profile information.
- **Wallet Management**: Check wallet balance at any time.
- **User Search**:  Browse a paginated list of users and search to find recipients for money transfers.
- **Send Money**: Transfer funds to other users with a short note, using atomic transactions.
- **Transaction History**: View a paginated list of all transactions and detailed transaction info.


---

<div align="center">

| Frontend Technologies 🎨         | Backend Technologies 🛠           |
|----------------------------------|-----------------------------------|
| React.js & React Icons           | Node.js with Express.js           |
| Tailwind CSS                     | MongoDB with Mongoose             |
| Axios for HTTP requests          | JWT for authentication            |
| React Hot Toast for notifications| Bcrypt.js for password hashing    |
| React Router DOM for navigation  | Zod for input validation          |
| Context API for state management |                                   |

</div>


## Contact

👾 Bhaskar Jha (✉️ [bhaskarjha.info@gmail.com](mailto:bhaskarjha.info@gmail.com))
