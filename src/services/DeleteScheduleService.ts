import { getRepository } from "typeorm";
import { Schedules } from "../entities/Schedules";

export class DeleteScheduleService {
    async execute(id: string): Promise<Schedules | Error> {
        const scheduleRepository = getRepository(Schedules);
        if (!(await scheduleRepository.findOne(id))) {
            return new Error("Schedule not found");
        }
        await scheduleRepository.delete(id);
    }
}