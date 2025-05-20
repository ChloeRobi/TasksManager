import type UserLogin from "../model/userLogin";
import type AuthenticationPort from "../port/authenticationPort";

export default class AuthenticationService {
    constructor(private authenticationPort: AuthenticationPort) {}

    public authenticateUser(userLogin: UserLogin): Promise<void> {
        return this.authenticationPort.authenticateUser(userLogin);
    }

}