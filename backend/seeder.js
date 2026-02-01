const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const colors = require('colors'); 
const User = require('./models/User');
const Blog = require('./models/Blog');
const bcrypt = require('bcryptjs');

dotenv.config();

// Connect to DB (copied from config/db.js to keep script standalone)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
    },
    {
        name: 'Jane Austen',
        email: 'jane@example.com',
        password: 'password123'
    }
];

const blogs = [
    {
        title: 'The Art of Minimalism',
        content: 'Minimalism is not about having less. It is about making room for more of what matters. In a world of clutter and noise, finding silence is a revolutionary act. We often confuse movement with progress, but stillness is where clarity is born.',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'Lifestyle',
        tags: ['minimalism', 'simplicity', 'focus']
    },
    {
        title: 'A Guide to Classic Typography',
        content: 'Typography is the voice of the written word. When choosing typefaces for a classic design, look for high contrast serifs like Didot or Bodoni for headlines, paired with readable sans-serifs or humanist serifs for body text. The goal is elegance and legibility.',
        image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: 'Design',
        tags: ['typography', 'design', 'fonts']
    },
    {
        title: 'Morning Routines of Successful Writers',
        content: 'Most successful writers share a common secret: consistency. It is not about waiting for inspiration to strike, but rather showing up at the desk every single day. Whether it is 5 AM or midnight, the habit is what creates the masterpiece.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: 'Productivity',
        tags: ['writing', 'habits', 'success']
    },
    {
        title: 'Understanding Modern Architecture',
        content: 'Modern architecture emerged at the turn of the 20th century as a movement away from the ornamentation of the past. It embraces clean lines, functional design, and the use of glass, steel, and reinforced concrete. But is it too cold for human habitation?',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'Architecture',
        tags: ['architecture', 'modernism', 'design']
    },
    {
        title: 'The Future of Web Development',
        content: 'As AI continues to evolve, the role of the web developer is shifting. We are moving from writing syntax to architecting systems. The future belongs to those who can understand the big picture and leverage tools to build faster, more accessible, and more human-centric experiences.',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: 'Technology',
        tags: ['web development', 'ai', 'future']
    }
];

const importData = async () => {
    await connectDB();

    try {
        // Clear existing data
        await Blog.deleteMany();
        await User.deleteMany();

        // Create Users
        // We need to hash passwords manually here since we are using insertMany or create directly without the save hook if we used insertMany, 
        // but let's use a loop or create to trigger middleware if possible, or just hash manually.
        // The User model has a pre-save hook, so we should instantiate and save.
        
        const createdUsers = [];
        for (const u of users) {
             const user = new User(u);
             // The pre('save') hook in User.js will hash the password
             const savedUser = await user.save();
             createdUsers.push(savedUser);
        }

        const adminUser = createdUsers[0]._id;
        const authorUser = createdUsers[1]._id;

        // Create Blogs
        const sampleBlogs = blogs.map((blog, index) => {
            return { 
                ...blog, 
                author: index % 2 === 0 ? adminUser : authorUser // Alternate authors
            };
        });

        await Blog.insertMany(sampleBlogs);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroyData(); // Not implemented, standard seeder pattern usually implies overwrite or import
} else {
    importData();
}
