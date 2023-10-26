import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http:HttpClient) { }
  Onlogin(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/user/get)`, data);
  }
  
}
