import type User from "../model/user";
import type UserToSave from "../model/userToSave";
import type UserPort from "../port/userPort";

export default class UserService {
	constructor(private userPort: UserPort) {}

	public saveUser(user: UserToSave): Promise<User> {
		return this.userPort.save(user);
	}

}