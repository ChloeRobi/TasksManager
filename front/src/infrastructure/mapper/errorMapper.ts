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
        if (error.response?.status == 404) {
            if (message == ErrorMessageDto.TASK_SEARCH_FAILURE) {
                return ErrorMessage.TASK_SEARCH_FAILURE;
            }
            if (message == ErrorMessageDto.TASK_DELETION_FORBIDDEN) {
                return ErrorMessage.TASK_DELETION_FORBIDDEN;
            }
        }
        if (error.response?.status == 403) {
            if (message == ErrorMessageDto.TASKS_LIST_DELETION_FORBIDDEN) {
                return ErrorMessage.TASKS_LIST_DELETION_FORBIDDEN;
            }
            if (message == ErrorMessageDto.TASK_DELETION_FORBIDDEN) {
                return ErrorMessage.TASK_DELETION_FORBIDDEN;
            }
            if (message == ErrorMessageDto.TASKS_SEARCH_FAILURE) {
                return ErrorMessage.TASKS_SEARCH_FAILURE;
            }
            if (message == ErrorMessageDto.TASKS_LISTS_SEARCH_FAILURE) {
                return ErrorMessage.TASKS_LISTS_SEARCH_FAILURE;
            }
        }
        if (error.response?.status == 400) {
            if (message == ErrorMessageDto.USER_CREATION_FAILURE) {
                return ErrorMessage.USER_CREATION_FAILURE;
            }
            if (message == ErrorMessageDto.TASK_CREATION_FAILURE) {
                return ErrorMessage.TASK_CREATION_FAILURE;
            }
            if (message == ErrorMessageDto.TASK_DELETION_FAILURE) {
                return ErrorMessage.TASK_DELETION_FAILURE;
            }
            if (message == ErrorMessageDto.TASKS_LIST_CREATION_FAILURE) {
                return ErrorMessage.TASKS_LIST_CREATION_FAILURE;
            }
            if (message == ErrorMessageDto.TASKS_LIST_DELETION_FAILURE) {
                return ErrorMessage.TASKS_LIST_DELETION_FAILURE;
            }
        }
        return ErrorMessage.GENERAL;
    }
}