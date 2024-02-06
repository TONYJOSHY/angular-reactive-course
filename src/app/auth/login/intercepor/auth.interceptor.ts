import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { User } from '../models/user.interface';
import { StorageVariables } from '../enum/storage-variables.enum';

export const AuthInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const STORAGE = StorageVariables;
  const user: User | null = JSON.parse(localStorage.getItem(STORAGE.USER_DATA) || 'null' )

  if(user){
    request = request.clone({
      setHeaders: {
        'bearer': `${user.token}`,
        'user-id': `${user.id}`,
        'timezone' : Intl.DateTimeFormat().resolvedOptions().timeZone,
        'language' : 'en'
      }
    })
  }
  return next(request);
}
