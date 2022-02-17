import { getRepository } from "typeorm";
import { Schedules } from "../entities/Schedules";
import { User } from "../entities/User";


type ScheduleRequest = {
    owner: string;
    rival: string;
    date: Date;
    status: string;
    id: string;
}

export class UpdateScheduleService {
    async execute({ owner, rival, date, status, id }: ScheduleRequest): Promise<Schedules | Error> {
        const scheduleRepository = getRepository(Schedules);
        const schedule = await scheduleRepository.findOne(id);
        const userRepository = getRepository(User);


        if (!schedule) {
            return new Error("Schedule not found");
        }

        if(!(await userRepository.findOne({id:owner}))) {
            return new Error("Onwer id not found");
        }        
        if(!(await userRepository.findOne({id:rival}))) {
            return new Error("Rival id not found");
        }
        schedule.owner_id = owner? owner : schedule.owner_id;
        schedule.rival_id = rival? rival : schedule.rival_id;
        schedule.date = date? date : schedule.date;
        schedule.status = status? status : schedule.status;
       
        return schedule;
    }
}


