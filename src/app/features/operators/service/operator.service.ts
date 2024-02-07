import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperatorParams } from '../models/operator-filter.interface';
import { ResponseArray, ResponseData } from 'src/app/auth/login/models/response.interface';
import { Operator, Standard } from '../models/operator.interface';
import { Country, FormatedCountry, SubDivisionHelper } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  baserUrl = environment.baseUrl2;

  private operatorParams: OperatorParams = { limit: 5, offset: 0, search: '', standard: '',
    country: '', state: '', blocked: false, approved:true }

  private operatorFilterParams$ = new BehaviorSubject<OperatorParams>(
    this.operatorParams
  );
  private operatorFilterActions$ = this.operatorFilterParams$.asObservable();
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

  countryList$ = this.http.get<ResponseData<Country>>(
    `${this.baserUrl}/accounts/countries/`
  ).pipe(
    map( (response: ResponseData<Country>) => {
      const country: Country = response.data;
      let countryList: FormatedCountry[] = [];
      for(let key in country){
        let tempCountry: FormatedCountry = {
          id: key,
          name: key,
          dial_code: country[key]?.alpha_2,
          alpha_2: country[key]?.alpha_2,
          tin: country[key]?.tin || '',
          sub_divisions: []
        }
        for(let prop in country[key].sub_divisions){
          let subDivison: SubDivisionHelper = country[key].sub_divisions[prop];
          tempCountry.sub_divisions.push(subDivison)
        }
        countryList.push(tempCountry)
      }
      return countryList;
    } )
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
