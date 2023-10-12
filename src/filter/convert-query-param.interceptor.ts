// convert-query-param.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ConvertQueryParamInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        if (request.query && request.query.pageLimit) {
            request.query.pageLimit = parseInt(request.query.pageLimit, 10); // Convert id to integer
        }
        if (request.query && request.query.pageNumber) {
            request.query.pageNumber = parseInt(request.query.pageNumber, 10); // Convert id to integer
        }
        return next.handle();
    }
}
