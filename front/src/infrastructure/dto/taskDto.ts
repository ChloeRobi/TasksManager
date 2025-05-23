export default interface TaskDto {
	id: number;
	short_description: string;
    description: string;
    end_date: Date;
    creation_date: Date;
}