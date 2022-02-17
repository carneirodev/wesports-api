import { getRepository } from "typeorm";
import { Schedules } from "../entities/Schedules";

interface listSchedules extends Schedules {
    dateConverted: string;
}

export class GetAllSchedulesService {
    async execute(): Promise<listSchedules[] | Error> {
        const scheduleRepository = getRepository(Schedules);
        const schedules = await scheduleRepository.find({
            relations: ["owner", "rival"]
        });
        let resultSchedules= schedules as listSchedules[];
        for (let i = 0; i < resultSchedules.length; i++) {
            resultSchedules[i].owner.password = undefined;
            if(resultSchedules[i].rival) {
                resultSchedules[i].rival.password = undefined;
            }
            //converte date para dd/mm/yyyy hh:mm
            resultSchedules[i] ={...resultSchedules[i], dateConverted: schedules[i].date.toLocaleString()}
        }
        

        if (!schedules) {
            return new Error("Schedules not found");
        }
        return resultSchedules;
    }
}

