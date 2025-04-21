import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../dto/response.dto'; // Asegúrate de importar el ResponseDto

// Atrapamos todas las excepciones que extienden HttpException
@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    const errorMessage =
      Array.isArray(message['message']) ? message['message'][0] : message['message'];

    response.status(status).json(
      ResponseDto.error(errorMessage || 'Ocurrió un error', null, status),
    );
  }
}
