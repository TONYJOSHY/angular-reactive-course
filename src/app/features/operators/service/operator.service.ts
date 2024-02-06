import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperatorParams } from '../models/operator-filter.interface';
import { ResponseArray, ResponseData } from 'src/app/auth/login/models/response.interface';
import { Operator, Standard } from '../models/operator.interface';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  baserUrl = environment.baseUrl2;

  operatorParams: OperatorParams = { limit: 5, offset: 0, search: '', standard: '',
    country: '', state: '', blocked: false, approved:true }

  private operatorFilterParams$ = new BehaviorSubject<OperatorParams>(
    this.operatorParams
  );
  operatorFilterActions$ = this.operatorFilterParams$.asObservable();
  loaderSubject$ = new Subject<boolean>();

  constructor(private http: HttpClient){}

  standardTreeList$ = this.http.get<ResponseData<Standard[]>>(
    `${this.baserUrl}/certification/standard/tree/`, 
    this.optionsWithParam({})
  )

  operatorList$ = this.operatorFilterActions$.pipe(
    tap(() => this.loaderSubject$.next(true)),
    switchMap( (filter: OperatorParams) => {
      return this.getOperatorList(filter).pipe(
        tap(() => this.loaderSubject$.next(false))
      )
    } ),
  )

  getOperatorList(params: OperatorParams){
    const url = `${this.baserUrl}/accounts/operator/`
    return this.http.get<ResponseArray<Operator[]>>(url, this.optionsWithParam(params))
      .pipe( map( (response: ResponseArray<Operator[]>) => response.data ) )
  }

  filterOperator(filters: OperatorParams){
    this.operatorFilterParams$.next(filters)
  }

  optionsWithParam(params: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'timezone' : Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      params: new HttpParams({
        fromObject: params
      })
    }
    return httpOptions
  }

}
