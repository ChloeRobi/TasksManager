export enum ErrorMessage {
    NO_USER_FOUND = "User login not found",
    WRONG_PASSWORD = "Wrong password",
    USER_CREATION_FAILURE = "Failure of the user creation",
    
    TASK_CREATION_FAILURE = "Failure of the task creation",
    TASKS_SEARCH_FAILURE = "Failure of the tasks search",
    TASK_SEARCH_FAILURE = "Failure of the task search",
    TASK_DELETION_FORBIDDEN = "No permission to delete this task",
    TASK_DELETION_FAILURE = "Failure of the task deletion",

    TASKS_LIST_CREATION_FAILURE = "Failure of the tasks list creation",
    TASKS_LISTS_SEARCH_FAILURE = "Failure of the tasks lists search",
    TASKS_LIST_SEARCH_FAILURE = "Failure of the tasks list search",
    TASKS_LIST_DELETION_FAILURE = "Failure of the tasks list deletion",
    TASKS_LIST_DELETION_FORBIDDEN = "No permission to delete this task list",

    GENERAL = "An internal error has occurred."
}