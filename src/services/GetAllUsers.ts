import { getRepository } from "typeorm";
import { User } from "../entities/User";

type UserList = {
    name: string;
    lastName: string;
    email: string;
}

export class GetAllUsersService {
    async execute(): Promise<UserList[] | Error> {
        const userRepository = getRepository(User);

        const users = await userRepository.find();

        if (!users) {
            return new Error("Categories not found");
        }

        const result = users.map(category => {
            const { password, ...rest } = category;
            return rest;
        });

        return result;
    }
}

