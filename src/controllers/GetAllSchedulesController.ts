import { Request, Response } from 'express';
import { GetAllSchedulesService } from '../services/GetAllSchedules';

export class GetAllSchedulesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = new GetAllSchedulesService();

        const categories = await service.execute();

        return response.json(categories);
    }
}
