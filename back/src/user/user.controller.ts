import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/:id')
    findOne(@Param() id: number) {
        return this.userService.findOne(id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findByEmail(@Query('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() userDto: UserDto): Promise<User> {
        return this.userService.save(userDto);
    }

}
