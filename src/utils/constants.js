//API call constants
export const SELECTED_EVENTS_POST = "http://localhost:5000/api/save-selected-events";
export const LOGIN_POST = "http://localhost:5000/api/login";
export const REGISTRATION_POST = "http://localhost:5000/api/users";

//Error based constants
export const SELECTED_EVENTS_ERROR_MESSAGE = "Error saving selected events: ";
export const  IS_LOGGED_IN= "isLoggedIn";
export const  ERROR_MESSAGE_MORE_THAN_3_EVENTS= "You can only select up to 3 events.";
export const USER_ID_MANDATORY = "userid is mandatory";
export const PASSWORD_MANDATORY = "password is a mandatory field";
export const FIRST_NAME_MANDATORY = "first name cannot be blank";
export const LAST_NAME_MANDATORY = "last name cannot be blank";
export const USER_ID_LENGTH_ERROR_MESSAGE ="UserId length must be greater than 7 letters";
export const PASSWORD_LENGTH_ERROR_MESSAGE ="Password must be atleast 8 characters long";
export const PASSWORD_UPPER_LETTER_ERROR_MESSAGE = "Password must contain at least one uppercase letter (A-Z)";
export const PASSWORD_LOWER_LETTER_ERROR_MESSAGE ="Password must contain atleast one lowercase letter (a-z)";
export const PASSWORD_NUMBER_ERROR_MESSAGE ="Password must contain atleast one digit (0-9)";
export const PASSWORD_SPECIAL_CHARACTER_ERROR_MESSAGE ="Password must contain atleast one special character (e.g.,(@$!%*?&)";

//Toast constants
export const SUCCESSFUL_REGISTRATION = "Registration Successful!";
export const SUCCESSFUL_LOGIN = "Login Successful!";
