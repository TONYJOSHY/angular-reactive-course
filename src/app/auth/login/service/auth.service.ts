import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User, UserForm } from '../models/user.interface';
import { ResponseData } from '../models/response.interface';
import { StorageVariables } from '../enum/storage-variables.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly STORAGE_VARIABLES = StorageVariables;
  baserUrl = environment.baseUrl2;

  userSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
    private router: Router){}

  postUser(userform: UserForm){
    const url = `${this.baserUrl}/accounts/login/`
    return this.http.post<ResponseData<User>>(url, userform, this.options())
      .pipe( 
        map((response: ResponseData<User>) => response.data ),
        tap( (user) => {
          localStorage.setItem(
            this.STORAGE_VARIABLES.USER_DATA, 
            JSON.stringify(user)
          )
          this.userSubject$.next(user);
          this.router.navigate(['nav/post'])
        } )
      )
  }

  options(){
    const httpOptions = {
      headers: new HttpHeaders({
        'timezone' : Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    }
    return httpOptions
  }

}
