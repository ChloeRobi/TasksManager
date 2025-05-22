import type User from "../model/user";
import type UserLogin from "../model/userLogin";
import type UserToSave from "../model/userToSave";
import type UserPort from "../port/userPort";

export default class UserService {
	constructor(private userPort: UserPort) {}

	public getUser(email: string): Promise<User> {
		return this.userPort.getUser(email);
	}

	public saveUser(user: UserToSave): Promise<User> {
		return this.userPort.save(user);
	}

}