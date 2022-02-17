import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class DeleteUserService {
    async execute(id: string): Promise<User | Error> {
        const userRepository = getRepository(User);
        if (!(await userRepository.findOne(id))) {
            return new Error("User not found");
        }
        await userRepository.delete(id);
    }
}