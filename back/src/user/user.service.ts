import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ErrorMessage } from './model/error-message';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }


    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user === null) {
            throw new NotFoundException(ErrorMessage.USER_SEARCH_FAILURE);
        }
        return user;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
        });
        if (!user) {
            throw new NotFoundException(ErrorMessage.USER_SEARCH_FAILURE);
        }
        return user;
    }

    async save(userDto: UserDto): Promise<User> {
        const numberOfRounds = 10;
        const hashedPassword = await bcrypt.hash(userDto.password, numberOfRounds);

        try {
            return await this.userRepository.save({
                ...userDto,
                password: hashedPassword,
            });
        } catch (e) {
            console.error('Erreur lors de la sauvegarde:', e);
            throw new BadRequestException(ErrorMessage.USER_CREATION_FAILURE);
        }
    }

}