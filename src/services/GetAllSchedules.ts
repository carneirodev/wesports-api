import { getRepository } from "typeorm";
import { Schedules } from "../entities/Schedules";



export class GetAllSchedulesService {
    async execute(): Promise<Schedules[] | Error> {
        const scheduleRepository = getRepository(Schedules);
        const schedules = await scheduleRepository.find({
            relations: ["owner", "rival"]
        });

        for (let i = 0; i < schedules.length; i++) {
            schedules[i].owner.password = undefined;
            schedules[i].rival.password = undefined;
        }
        

        if (!schedules) {
            return new Error("Schedules not found");
        }
        return schedules;
    }
}

