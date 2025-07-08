import cors from "cors";

export const corsMiddleware = cors({
  origin: true,
  methods: ["POST", "GET", "PATCH"],
  credentials: true,
});
