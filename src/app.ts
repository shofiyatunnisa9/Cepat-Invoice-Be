import dotenv from "dotenv"
import express from "express"
import authRouter from "./routes/auth"
import userRouter from "./routes/user"
import { errorHandler } from "./middlewares/errorHandler"


dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`)
})