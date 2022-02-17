import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuthenticated(
    request: Request & { user: {
        id: string;
    } },
    response: Response,
    next: NextFunction,
):  void | Error {
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {               
        throw new AppError('JWT token is missing');
    }
    console.log("authHeader: ", authHeader);
    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, auth.jwt.secret);
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };
        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token');
    }
}
