import type User from "@/domain/model/user";
import type UserLogin from "../model/userLogin";

export default interface AuthenticationPort {
    authenticateUser(userLogin: UserLogin): Promise<void>;
}