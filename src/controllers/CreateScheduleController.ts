import {Request, Response} from 'express';
import { CreateScheduleService } from '../services/CreateScheduleService';

export class CreateScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { owner, rival, date, status} = request.body;

        const service = new CreateScheduleService();
        const result = await service.execute({
            owner, rival, date, status
        });

        if(result instanceof Error){
            return response.status(400).json({
                message: result.message
            });
        }

        return response.json(result);
    }
}