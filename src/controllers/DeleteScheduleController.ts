import { Request, Response } from 'express';
import { DeleteScheduleService } from '../services/DeleteScheduleService';

export class DeleteScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new DeleteScheduleService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json({
                error: result.message
            });
        }

        return response.status(204).send();
    }
}