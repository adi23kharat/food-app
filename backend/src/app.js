// create server
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import foodpartnerRouter from './routes/food-partner.routes.js'
import foodRouter from './routes/food.routes.js'
import cors from 'cors'
const app = express();


app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/',authRouter)
app.use('/food',foodRouter)
app.use('/food-partner',foodpartnerRouter)

export default app; 