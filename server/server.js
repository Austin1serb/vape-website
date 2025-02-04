require('dotenv').config();
require('./config/mongoose.config');

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://vape-website-client.vercel.app",
    process.env.BACKEND_URL, // ✅ Dynamically allow backend API
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("Blocked CORS request from:", origin); // 🔥 Log blocked origins for debugging
            callback(new Error("CORS policy violation"));
        }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json()); // ✅ Move this before routes to ensure proper request parsing

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://vape-website-client.vercel.app"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://vape-website-client.vercel.app"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "https://res.cloudinary.com", "data:"],
            connectSrc: ["'self'", "http://localhost:8000", "https://vape-website-client.vercel.app", process.env.BACKEND_URL], // ✅ Add Fly.io backend dynamically
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
        },
    },
}));

const { uploadToCloudinary } = require('./services/cloudinary');
const productRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/orders.routes');
const guestRoutes = require('./routes/guest.routes');
const userRoutes = require('./routes/users.routes');
const shippoRoutes = require('./routes/shippo.routes');
const suggestionsRoutes = require('./routes/suggestions.routes');
const passwordResetRoutes = require('./routes/passwordReset.routes');
const contactRoutes = require('./routes/contact.routes');
const brandRoutes = require('./routes/brands.routes');
const categoryRoutes = require('./routes/categories.routes');

app.use('/api', passwordResetRoutes);
app.use("/api/", suggestionsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/brand', brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/guest', guestRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadToCloudinary);
app.use('/api/shippo', shippoRoutes);
app.use('/api/contact', contactRoutes);

module.exports = app;
module.exports.handler = serverless(app);

// ✅ Use process.env.PORT to match Fly.io's assigned port dynamically
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port: ${port} 🚀`));