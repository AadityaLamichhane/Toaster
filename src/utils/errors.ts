import { error } from "console";
import { ValidationReturnType } from "./helper";
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	VALIDATION_ERROR: 422,
	INTERNAL_SERVER_ERROR: 500
} as const;
// Validation Error Thrower
export const throwErrorOnValidation = (validationstring: string) => {
	const errorMessage = new Error(`Validation Error: ${validationstring}`);
	errorMessage.name = "ValidationError";
	throw errorMessage;
}
export const throwValidationError = (validation_result: ValidationReturnType) => {
	if (validation_result.errors && validation_result.errors.length > 0) {
		const errormessage = `validation error: ${validation_result.errors.join(', ')}`;
		const error = new Error(errormessage);
		error.name = "ValidationError";
		(error as any).details = validation_result.errors; // Add details for server error handler
		throw error;
	}
	const error = new Error("Validation Error: Unexpected validation failure");
	error.name = "ValidationError";
	throw error;
};
// Additional error helpers you can use in other controllers
export const throwNotFoundError = (resource: string) => {
	const error = new Error(`NotFoundError: ${resource} not found`);
	error.name = "NotFoundError";
	throw error;
};
export const throwUnauthorizedError = (message: string = "Unauthorized access") => {
	const error = new Error(`Unauthorized access :${message}`);
	error.name = "UnauthorizedError";
	throw error;
};
