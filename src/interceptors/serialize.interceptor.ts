import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) {
    }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a request is handled 
        // by the request handler
        // console.log('Im running before the handler', context);


        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the response is sent out
                // using plainToInstance instead of plainToClass as plainToClass is deprecated
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
        
    }
}
