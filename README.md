# Cognetix Blog Management System

A full-stack web application for managing and sharing blog posts with user authentication, comments, and profile management.

## Features

- **User Authentication**: Register and login functionality with secure password handling
- **Blog Management**: Create, read, update, and delete blog posts
- **Comments System**: Add and manage comments on blog posts
- **User Profiles**: User profile management and viewing
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **RESTful API**: Complete backend API with proper authentication middleware

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Mongoose** for ODM

### Frontend
- **React** with JSX
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Context API** for state management
- **Axios** for API calls

## Project Structure

```
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── seeder.js        # Database seeder
│   ├── server.js        # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context for state
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Run the seeder to populate sample data (optional):
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create new blog (requires auth)
- `PUT /api/blogs/:id` - Update blog (requires auth)
- `DELETE /api/blogs/:id` - Delete blog (requires auth)

### Comments
- `GET /api/comments/:blogId` - Get comments for a blog
- `POST /api/comments` - Add comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (requires auth)

## Usage

1. Register a new account or login with existing credentials
2. Browse the dashboard to view all blog posts
3. Create a new blog post using the "Create Blog" button
4. Click on any blog post to view details and add comments
5. Edit or delete your own blog posts from the dashboard
6. Manage your profile from the Profile page

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@cognetix.com or open an issue on GitHub.

---

**Happy Blogging! 📝**
