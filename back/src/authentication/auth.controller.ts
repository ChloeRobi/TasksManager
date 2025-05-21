import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
    ) { }

    @Post()
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        console.log(req)
        return req.user;
    }
    
}