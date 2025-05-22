import { IsNotEmpty } from "class-validator";

export class TaskDto {

    @IsNotEmpty()
    short_description: string;

    description: string;

    @IsNotEmpty()
    end_date: Date;

    @IsNotEmpty()
    tasks_list_id: number;
    
}
