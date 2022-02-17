import { getRepository } from "typeorm";
import {v4 as uuid} from "uuid";
import { Schedules } from "../entities/Schedules";
import { User } from "../entities/User";

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
            return new Error("Onwer id not found");
        }        
        console.log("aqui4");

        if(!(await userRepository.findOne({id: rival}))) {
            return new Error("Rival id not found");
        }

        const result = scheduleRepository.create({
            owner_id: owner,
            rival_id: rival,
            date,
            status
        });
        
        await scheduleRepository.save(result);
        return result;

    }
}