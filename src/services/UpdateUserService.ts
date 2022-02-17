import { getRepository } from "typeorm";
import { User } from "../entities/User";

type UserUpdateRequest = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
    team: string;
    acronym: string;
}

export class UpdateUserService {
    async execute({ id, name, lastName, email, acronym, team,  password  }: UserUpdateRequest): Promise<User | Error> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(id);

        if (!user) {
            return new Error("User not found");
        }

        user.name = name ? name : user.name;
        user.password = password ? password : user.password;
        user.lastName = lastName ? lastName : user.lastName;
        user.email = email ? email : user.email;
        user.acronym= acronym ? acronym : user.acronym;
        user.team = team ? team : user.team;

        await userRepository.save(user);

        return user;
    }
}