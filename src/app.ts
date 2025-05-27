import dotenv from "dotenv"
import express from "express"


dotenv.config()

const app = express()
const PORT = process.env.PORT

app.listen( () => {
  console.log(`running on http://localhost:${PORT}`)
})