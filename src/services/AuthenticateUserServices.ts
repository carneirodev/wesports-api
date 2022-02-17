import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '../entities/User';
import auth from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserServices {
    public async execute({ email, password }: Request): Promise<Response | Error> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });
        if (!user) {
            return new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            return new Error('Incorrect email/password combination.');
        }
        const { secret, expiresIn } = auth.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserServices;
