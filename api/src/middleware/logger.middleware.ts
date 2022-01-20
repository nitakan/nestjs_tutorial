import { Request, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(req.originalUrl);
        next();
}