import type User from "@/domain/model/user";import type UserToSave from "../model/userToSave";

export default interface UserPort {
	getUserByEmail(email: string): Promise<User>;
	getUser(id: number): Promise<User>;
	save(user: UserToSave): Promise<User>;
}