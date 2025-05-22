import type User from "@/domain/model/user";
import type UserLogin from "../model/userLogin";
import type { AxiosInstance } from "axios";

export default interface AuthenticationPort {
    authenticateUser(userLogin: UserLogin): Promise<void>;
    logout(): void;
    isAuthenticated(): boolean;
    getApi(): AxiosInstance;
}