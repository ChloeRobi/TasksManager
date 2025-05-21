import { ErrorMessage } from "@/domain/model/errorMessage";
import type { AxiosError } from "axios";
import { ErrorMessageDto } from "../dto/errorMessageDto";

export class ErrorMapper {
    static apply(error: AxiosError): ErrorMessage {
        const message = (error.response?.data as any)?.message;
        if (error.response?.status == 401) {
            if (message == ErrorMessageDto.NO_USER_FOUND) {
                return ErrorMessage.NO_USER_FOUND;
            }
            if (message == ErrorMessageDto.WRONG_PASSWORD) {
                return ErrorMessage.WRONG_PASSWORD;
            }
        }
        if (error.response?.status == 400) {
            if (message == ErrorMessageDto.USER_CREATION_FAILURE) {
                return ErrorMessage.USER_CREATION_FAILURE;
            }
        }
        return ErrorMessage.GENERAL;
    }
}