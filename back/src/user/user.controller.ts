import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt.guard';

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
    findByEmail(@Query() query: { email: string }) {
        return this.userService.findByEmail(query.email);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() userDto: UserDto) {
        console.log(userDto)
        return this.userService.save(userDto);
    }

}
