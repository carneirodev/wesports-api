import { Request, Response } from 'express';

import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {name, lastName, password, email, acronym, team} = request.body;

        const updateUserService = new UpdateUserService();

        const result = await updateUserService.execute({
            name, lastName, password, email, id, acronym, team
        });
        
        if(result instanceof Error){
            return response.status(400).json({
                message: result.message
            });
        }

        return response.json(result);
    }
}