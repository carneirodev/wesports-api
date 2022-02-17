import { Request, Response } from 'express';

import { UpdateScheduleService } from "../services/UpdateScheduleService";

export class UpdateScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {owner, rival, date, status} = request.body;
        const updateScheduleService = new UpdateScheduleService();

        const result = await updateScheduleService.execute({
            owner, rival, date, status, id
        });
        
        if(result instanceof Error){
            return response.status(400).json({
                message: result.message
            });
        }

        return response.json(result);
    }
}