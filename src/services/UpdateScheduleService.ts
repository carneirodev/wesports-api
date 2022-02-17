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

        // if(!(await userRepository.findOne({id:owner}))) {
        //     return new Error("Onwer id not found");
        // }
        console.log("Schedule", schedule);
        //convert this 2022-04-07 21:38 to this 2022-02-17T03:57:47.000Z


         

        console.log(date ? date + 'asdasd': "null");
        schedule.rival_id = rival ? rival : schedule.rival_id;
        schedule.date = date? date : schedule.date;
        schedule.status = rival? 'Agendado' : schedule.status;
        
        console.log(schedule.date)
        await scheduleRepository.save(schedule);
        return schedule;
    }
}


