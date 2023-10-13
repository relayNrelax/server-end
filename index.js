import dotenv from 'dotenv'
import express from 'express';
import connectDB from './config/config.js';
import userRouter from './route/userRoute.js';
import cors from "cors"
import alertRoute from './route/alertRoute.js';
dotenv.config()

const app = express()
app.use(cors({
    origin: 'https://relynrelax.com/',
}))

connectDB()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/alert', alertRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
})