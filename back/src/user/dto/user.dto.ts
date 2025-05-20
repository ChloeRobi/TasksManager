import { IsNotEmpty, Length } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @Length(1, 1024)
    firstname: string;

    @IsNotEmpty()
    @Length(1, 1024)
    lastname: string;

    @IsNotEmpty()
    @Length(1, 1024)
    email: string;

    @IsNotEmpty()
    @Length(1, 1024)
    password: string;

}