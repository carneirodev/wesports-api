import { getRepository } from "typeorm";
import { User } from "../entities/User";

type UserRequest = {
    name: string;
    lastName: string;
    password: string;    
    email: string;
    team: string;
    acronym: string;
}

export class CreateUserService {
     async execute({name, lastName, password, email, team, acronym}: UserRequest): Promise<User | Error> {
        const categoryRepository = getRepository(User);

        if(await categoryRepository.findOne({email})){
            return new Error("User already exists");
        }

        const result = categoryRepository.create({
            name,
            lastName, 
            password,
            email,
            team,
            acronym
        });
        
        await categoryRepository.save(result);
        return result;

    }
}