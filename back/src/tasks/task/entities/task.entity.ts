import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TasksList } from "../../tasksList/entities/tasks-list.entity";

@Entity({ name: 'task' })
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    short_description: string;

    @Column()
    @IsString()
    description: string;

    @Column()
    @IsDate()
    @IsNotEmpty()
    end_date: Date;

    @ManyToOne(() => TasksList, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'tasks_list_id' })
    tasks_list: TasksList;

}
