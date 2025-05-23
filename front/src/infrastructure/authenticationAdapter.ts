import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import type UserLogin from "@/domain/model/userLogin";
import type AuthenticationPort from "@/domain/port/authenticationPort";
import { ErrorMapper } from "./mapper/errorMapper";

const TOKEN_KEY = 'authToken';

export default class AuthenticationAdapter implements AuthenticationPort {
    constructor(private axiosInstance: AxiosInstance) {
        const token = this.getToken();
        if (token) {
            this.setAuthHeader(token);
        }
    }

    async authenticateUser(userLogin: UserLogin): Promise<void> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post('/auth', userLogin)
                .then((response: AxiosResponse) => {
                    const token = response.data;
                    this.saveToken(token);
                    this.setAuthHeader(token);
                    resolve();
                })
                .catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    private saveToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    private getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    private setAuthHeader(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
    
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getApi(): AxiosInstance {
        return this.axiosInstance;
    }

}
