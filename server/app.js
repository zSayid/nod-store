import express from 'express';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cors from 'cors';
import { protect } from './middleware/auth.middleware.js';



const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', protect, orderRoutes);

export default app;


