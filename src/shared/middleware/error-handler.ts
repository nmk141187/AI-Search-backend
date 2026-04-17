import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { error } from "console";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details
        });
        return;
    } 
    
    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
        return;
    } 
    
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}
