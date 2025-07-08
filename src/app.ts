import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/profile";
import invoiceRouter from "./routes/invoice";
import { errorHandler } from "./middlewares/errorHandler";
import { corsMiddleware } from "./configs/cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRouter);
// app.use('/api/v1', userRouter)
// app.use('/api/v1', invoiceRouter)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
