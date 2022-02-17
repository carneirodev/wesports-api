import { Request, Response } from 'express';
import { GetAllUsersService } from '../services/GetAllUsers';

export class GetAllUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = new GetAllUsersService();

        const categories = await service.execute();

        return response.json(categories);
    }
}
