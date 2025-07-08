import { NextFunction, Response, Request } from "express";
import Joi from "joi";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "../../generated/prisma/runtime/library";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Joi.ValidationError) {
    res.status(400).json({ message: err.message, field: err.details });
    return;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    const { code } = err;
    switch (code) {
      case "P2002":
        const field = Array.isArray(err.meta?.target)
          ? err.meta.target[0]
          : err.meta?.target;
        switch (field) {
          case "email":
            res.status(400).json({
              message: "Email is already registered.",
            });
            break;
          case "userId":
            res.status(400).json({
              message: "User already has a profile",
            });
            break;
          default:
            res.status(400).json({
              message: `field: ${err.meta?.target}`,
            });
            break;
        }
        break;
      default:
        res.status(400).json({ message: err.code });
        break;
    }
  }

  if (err instanceof PrismaClientInitializationError) {
    const { errorCode } = err;
    res
      .status(400)
      .json({ code: errorCode, name: err.name, message: err.message });
  }

  if (err instanceof PrismaClientValidationError) {
    res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    name: err.name,
    message: err.message,
  });
}
