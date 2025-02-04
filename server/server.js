require('dotenv').config();
require('./config/mongoose.config');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://vape-website-client.vercel.app" // ✅ Allow Vercel Frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy violation"));
        }
    },
    credentials: true, // ✅ Allow cookies & authentication
    methods: "GET,POST,PUT,DELETE,OPTIONS",
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'", 'https://res.cloudinary.com'],
            connectSrc: ["'self'", 'http://localhost:8000'],
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
            // Add other directives as needed
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
//app.use('/api/payment', paymentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/brand', brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/guest', guestRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadToCloudinary);
app.use('/api/shippo', shippoRoutes);
app.use(bodyParser.json());
app.use('/api/contact', contactRoutes);

module.exports = app;
module.exports.handler = serverless(app);

// This part is not needed for serverless functions
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port} AUSTIN SERB CREATED THIS!!`));