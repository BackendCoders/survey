import { Request, Response, NextFunction } from 'express';
import AppError from '@/utils/appError';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err.stack);
	const statusCode =
		err instanceof AppError && err.statusCode ? err.statusCode : 500;
	res.status(statusCode).json({
		message: err.message || 'Internal Server Error',
	});
};
