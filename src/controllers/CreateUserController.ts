import {Request, Response} from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, lastName, password, email, acronym, team} = request.body;

        const service = new CreateUserService();

        const result = await service.execute({
            name, lastName, password, email, acronym, team
        });

        if(result instanceof Error){
            return response.status(400).json({
                message: result.message
            });
        }

        return response.json(result);
    }
}