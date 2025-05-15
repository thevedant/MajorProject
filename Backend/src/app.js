import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
import orgRoutes from './routes/org.routes.js'
import reqRoutes from './routes/req.routes.js'
import contractRoutes from './routes/contracts.routes.js'
const app = express();

// CORS configuration

app.use(cors());
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true, // Allow cookies in CORS
// }));


// Body parsing middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Static files & cookies
app.use(express.static('public'));
app.use(cookieParser());

// Routes (uncomment when ready)
// import userRouter from './routes/user.routes.js';
app.use('/api/users', userRoutes);
app.use('/api/org', orgRoutes);
app.use('/api/requests' , reqRoutes);
app.use('/api/contract' , contractRoutes)

export { app };