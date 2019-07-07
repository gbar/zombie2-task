import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    response
      .status(HttpStatus.NOT_FOUND)
      .json({
        statusCode: HttpStatus.NOT_FOUND,
        message: [
          {
            timestamp: new Date().toISOString(),
            path: request.url,
            target: EntityNotFoundErrorFilter.parseMessageToTarget(exception.message),
          }
        ],
      });
  }

  private static parseMessageToTarget(message: string): string {
    const exceptionMessage = message.replace('Could not find any entity of type "', '');

    return exceptionMessage.substr(0, exceptionMessage.indexOf('"'));
  }
}