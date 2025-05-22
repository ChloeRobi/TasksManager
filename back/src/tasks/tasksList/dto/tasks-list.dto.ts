import { IsNotEmpty } from "class-validator";

export class TasksListDto {

    @IsNotEmpty()
    title: string;

}