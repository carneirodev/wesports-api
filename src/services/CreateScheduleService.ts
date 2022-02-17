import { getRepository } from "typeorm";
import {v4 as uuid} from "uuid";
import { Schedules } from "../entities/Schedules";
import { User } from "../entities/User";
import AppError from "../errors/AppError";

type ScheduleRequest = {
    owner: string;
    rival: string;
    date: Date;
    status: string;
}

export class CreateScheduleService {
     async execute({owner, rival, date, status }: ScheduleRequest): Promise<Schedules | Error> {
        const scheduleRepository = getRepository(Schedules);
        const userRepository = getRepository(User);

        if(!(await userRepository.findOne({id: owner}))) {
            throw new AppError("Onwer id not found", 400);
        }        
        console.log("aqui4");

        
        //check if already exists
        const schedule = await scheduleRepository.findOne({
            where: {
                owner_id: owner,
                rival_id: rival,
                date
            }
        });
        console.log("schedule", schedule);
        if(schedule) {
            throw new AppError("Schedule already exists", 400);
        }


        const result = scheduleRepository.create({
            owner_id: owner,
            rival_id: rival? rival : null,
            date,
            status
        });
        
        await scheduleRepository.save(result);
        return result;

    }
}