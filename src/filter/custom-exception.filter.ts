import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();
        console.log(exceptionResponse);

        const errorResponse = {
            code: status,
            // message: exceptionResponse.message || 'Internal Server Errors',
            message: exception instanceof CustomException ? exceptionResponse : exceptionResponse.message || 'Internal Server Error',
            error: exception instanceof CustomException ? exception['error'] : exceptionResponse.error || 'Internal Server Error',
        };
        response.status(status).json(errorResponse);
    }
}

export class CustomException extends HttpException {
    constructor(message: string, statusCode: HttpStatus, error?: any) {
        super(message, statusCode);
        this.error = error;
    }

    error: any;
}