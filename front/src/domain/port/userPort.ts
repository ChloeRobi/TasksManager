import type User from "@/domain/model/user";import type UserToSave from "../model/userToSave";

export default interface UserPort {
	save(user: UserToSave): Promise<User>;
}