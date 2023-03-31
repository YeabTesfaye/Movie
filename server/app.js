import colors from 'colors'
import express from 'express'
import dotenv from 'dotenv'
import CONNECTDB from './lib/db.js';
import userRoute from './api/routes/user.js'
import adminRoute from './api/routes/admin.js'
import movieRoute from './api/routes/movie.js'
import bookingRoute from './api/routes/booking.js'
import {errorHandler} from './api/../middleware/errorMiddleware.js'
import cors from 'cors'

dotenv.config();
const PORT =  process.env.PORT || 5000;
CONNECTDB(process.env.MONGO_URI);

const app = express();
app.use(express.json())
app.use(cors())



app.use('/api/user', userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/movie", movieRoute);
app.use("/api/booking", bookingRoute);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`${PORT}`);
})