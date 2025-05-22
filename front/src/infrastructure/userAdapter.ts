import type User from "@/domain/model/user";
import type UserPort from "@/domain/port/userPort";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import type UserDto from "@/infrastructure/dto/userDto";
import type UserToSave from "@/domain/model/userToSave";
import { ErrorMapper } from "./mapper/errorMapper";
import type UserLogin from "@/domain/model/userLogin";

export default class UserAdapter implements UserPort {
    constructor(private axiosInstance: AxiosInstance) { }

    getUser(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .get('/users', {
                    params: {
                        email: email
                    }
                })
                .then((response: AxiosResponse) => {
                    const userDto: UserDto = response.data;
                    const user: User = {
                        id: userDto.id,
                        firstname: userDto.firstname,
                        lastname: userDto.lastname,
                        email: userDto.email
                    }
                    resolve(user);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    save(user: UserToSave): Promise<User> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post('/users', user)
                .then((response: AxiosResponse) => {
                    const userDto: UserDto = response.data;
                    const user: User = {
                        id: userDto.id,
                        firstname: userDto.firstname,
                        lastname: userDto.lastname,
                        email: userDto.email
                    }
                    resolve(user);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

}