import type User from "@/domain/model/user";import type UserToSave from "../model/userToSave";
import type UserLogin from "../model/userLogin";

export default interface UserPort {
	getUser(email: string): Promise<User>;
	save(user: UserToSave): Promise<User>;
}