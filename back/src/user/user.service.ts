import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { ErrorMessage } from './model/errorMessage';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }


    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOne(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
        });
        if (user === undefined) {
            throw new NotFoundException('Project cannot be found');
        }
        return user;
    }

    async save(userDto: UserDto): Promise<User> {
        const numberOfRounds = 10;
        const hashedPassword = await bcrypt.hash(userDto.password, numberOfRounds);
        console.log('User to save:', {
        ...userDto,
        password: hashedPassword,
        });

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