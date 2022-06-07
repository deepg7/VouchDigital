//DECLARING STANDARD ERROR INTERFACE
export interface StandardError {
  status: number;
  message: string;
}

//NULL ARRAY
const NULL_ARRAY = [0, null, "", undefined];

//SOME ERROR OBJECTS
const NOT_FOUND_ERROR: StandardError = {
  status: 404,
  message: "Resource Not Found",
};

const BAD_REQUEST_ERROR: StandardError = {
  status: 400,
  message: "Bad Request",
};

const AUTHENTICATION_ERROR: StandardError = {
  status: 401,
  message: "Authentication Error",
};

//EXPORTING ALL CONSTANTS
export { NULL_ARRAY, NOT_FOUND_ERROR, BAD_REQUEST_ERROR, AUTHENTICATION_ERROR };
