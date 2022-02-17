import {Request, Response} from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

export class SessionsController {
    async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserServices();

    const result = await authenticateUser.execute({
        email,
        password,
    });

    if (result instanceof Error) {
        return response.status(400).json({
            message: result.message,
        });
    }
    
    const { user, token } = result;
    delete user.password;
    return response.json({ user, token });
}
}