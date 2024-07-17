require('dotenv').config();
require('./config/mongoose.config');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const frontEndDomain = process.env.FRONTEND_DOMAIN

app.use(cors({
    origin: frontEndDomain,
    credentials: true,
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
const guestRoutes = require('./routes/guest.routes')
const userRoutes = require('./routes/users.routes');
const shippoRoutes = require('./routes/shippo.routes');
const suggestionsRoutes = require('./routes/suggestions.routes');
//const paymentRoutes = require('./routes/payment.routes');
const passwordResetRoutes = require('./routes/passwordReset.routes')
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




app.listen(port, () => console.log(`Listening on port: ${port} AUSTIN SERB CREATED THIS!!`));