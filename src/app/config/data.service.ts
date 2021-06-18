import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { importType } from '@angular/compiler/src/output/output_ast';
import { DataResponse } from '../config/DataResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  configUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<DataResponse>(this.configUrl);
  }

}
