import { HTTP_STATUS } from './errors';

export interface ApiResponse<T = any> {
    success: boolean;
    status: number;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}

export const successResponse = <T>(data: T, status: number = HTTP_STATUS.OK): ApiResponse<T> => ({
    success: true,
    status,
    data
});

export const errorResponse = (
    code: string,
    message: string,
    status: number = HTTP_STATUS.BAD_REQUEST,
    details?: any
): ApiResponse => ({
    success: false,
    status,
    error: {
        code,
        message,
        ...(details && { details })
    }
});

export const validationErrorResponse = (details: any): ApiResponse => ({
    success: false,
    status: HTTP_STATUS.VALIDATION_ERROR,
    error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details
    }
});

export const notFoundErrorResponse = (resource: string): ApiResponse => ({
    success: false,
    status: HTTP_STATUS.NOT_FOUND,
    error: {
        code: 'NOT_FOUND',
        message: `${resource} not found`
    }
});

export const serverErrorResponse = (error: Error): ApiResponse => ({
    success: false,
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? {
            message: error.message,
            stack: error.stack
        } : undefined
    }
});