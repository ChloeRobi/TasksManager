import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import type UserLogin from "@/domain/model/userLogin";
import type AuthenticationPort from "@/domain/port/authenticationPort";
import { ErrorMapper } from "./mapper/ErrorMapper";

export default class AuthenticationAdapter implements AuthenticationPort {
    constructor(private axiosInstance: AxiosInstance) {}

    authenticateUser(userLogin: UserLogin): Promise<void> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post('/auth', userLogin)
                .then((response: AxiosResponse) => {
                    localStorage.setItem("token", response.data);
                    resolve();
                })
                .catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }
}
