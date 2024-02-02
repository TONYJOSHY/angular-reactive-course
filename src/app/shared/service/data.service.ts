import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  optionsWithParams(params: any){
    const httpOptions = {
      params: new HttpParams({ fromObject: params }),
    }
    return httpOptions;
  }
}
