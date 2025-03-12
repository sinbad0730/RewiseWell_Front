import http, { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import { parse } from 'url';
import { StringDecoder } from 'string_decoder';

const PORT = process.env.PORT || 5000;

// MongoDB connection URI
const uri = "mongodb+srv://danhilltravel151:0CYM7GBSu5o4Obsn@edtech.ysrpt72.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch((err: any) => console.log(err));

// Define the user schema and model
const userSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    registration_date: String,
    subjects: [
        {
            subject_id: String,
            subject_name: String,
            units: [
                {
                    unit_id: String,
                    unit_name: String,
                    scores: [Number],
                    progress: {
                        completed_topics: Number,
                        total_topics: Number
                    }
                }
            ]
        }
    ]
});

const User = mongoose.model('User', userSchema);

// Utility function to handle POST data
const collectRequestData = (request: IncomingMessage, callback: (data: any) => void) => {
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    request.on('data', (chunk) => {
        buffer += decoder.write(chunk);
    });

    request.on('end', () => {
        buffer += decoder.end();
        callback(JSON.parse(buffer));
    });
};

// Create HTTP server
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url!, true);
    const path = parsedUrl.pathname;
    const method = req.method?.toUpperCase();

    console.log(`Received request: ${method} ${path}`);

    if (path === '/api/user' && method === 'POST') {
        collectRequestData(req, async (data) => {
            const newUser = new User(data);
            try {
                await newUser.save();
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User created' }));
            } catch (err: any) {
                console.error('Error saving user:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else if (path && path.startsWith('/api/user/') && method === 'GET') {
        const userId = path.split('/').pop();
        console.log(`Fetching user with ID: ${userId}`);
        User.findOne({ user_id: userId }, (err: mongoose.CallbackError, user: any) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            } else if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// const Item = require("./models/Item"); // Create the Item model

// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });