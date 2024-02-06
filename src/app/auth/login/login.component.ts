import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; 
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { User, UserForm } from './models/user.interface';
import { EMPTY, Observable, catchError } from 'rxjs';
import { CustomError } from './models/error.interface';

export interface LoginFormInterface {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class LoginComponent {

  loginForm = this.fb.nonNullable.group<LoginFormInterface>({
    username: this.fb.nonNullable.control('', Validators.required),
    password: this.fb.nonNullable.control('', Validators.required)
  })
  userObs$!: Observable<User | null>;
  errors: string = '';
  
  constructor(private fb: FormBuilder,
    private authService: AuthService){}

  onSubmit(){
    if(this.loginForm.valid){
      this.userObs$ = this.authService.postUser(this.loginForm.value as UserForm).pipe(
        catchError( (err: CustomError) => {
          for(let key in err.error.detail){
            this.errors += key + ' ' + err.error.detail[key].toString()
          }
          return EMPTY;
        } )
      )
    }
  }

}
