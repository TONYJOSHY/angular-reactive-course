import { CanActivateFn } from '@angular/router';
import { User } from '../models/user.interface';
import { StorageVariables } from '../enum/storage-variables.enum';

export const authGuard: CanActivateFn = (route, state) => {
  
  const STORAGE = StorageVariables;
  const user: User | null = JSON.parse(localStorage.getItem(STORAGE.USER_DATA) || 'null' )
  if(user) return true;
  return false;
  
};
