import { Catch, ArgumentsHost, HttpStatus, HttpException, BadRequestException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { FastifyRequest, FastifyReply } from 'fastify';
import { QueryFailedError } from "typeorm";
import { ValidationError } from 'class-validator'

type ErrorResponse = {
    statusCode: number,
    timeStamp: string,
    path: string,
    message: string | object,
    type: string,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        const errResponse: ErrorResponse = {
            statusCode: 500,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: '',
            type: 'Error',
        }

        if (exception instanceof QueryFailedError) { // from type orm
            errResponse.statusCode = 422
            errResponse.message = exception.message.replaceAll('\n', ' ')
            errResponse.type = QueryFailedError.name
        } else if (exception instanceof BadRequestException) { // due to http error
            const exceptionResponse = exception.getResponse();
            errResponse.statusCode = exception.getStatus()
            errResponse.type = typeof exception.cause === "string" ? exception.cause : BadRequestException.name

            if (typeof exceptionResponse !== "string" && "message" in exceptionResponse && Array.isArray(exceptionResponse.message)) { // handling Class-Validator error
                errResponse.message = exceptionResponse.message
            } else {
                errResponse.message = exceptionResponse
            }
        } else if (exception instanceof HttpException) {
            errResponse.statusCode = exception.getStatus()
            errResponse.message = exception.getResponse()
            errResponse.type = HttpException.name
        } else if (exception instanceof TypeError || exception instanceof Error) { // from type script
            errResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errResponse.message = exception.message;
            errResponse.type = 'TypeError | Error'
        } else { // others
            errResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errResponse.message = 'Internal Server Error'
            errResponse.type = 'Others'
        }

        response
            .status(errResponse.statusCode)
            .send(errResponse); // Fastify's way of sending a response

        super.catch(exception, host);
    }
}
