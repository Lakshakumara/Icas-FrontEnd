import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Scheme, SchemeTitles } from '../Model/scheme';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  private serviceUrl = environment.baseUrl+"/admin/scheme";

  constructor(private http: HttpClient) {}
  
  getSchemeTitle(): Observable<SchemeTitles[]> {
    return this.http.get(`${this.serviceUrl}/titles`).pipe<SchemeTitles[]>(map((data: any) => data));
  }
  getScheme(): Observable<Scheme[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Scheme[]>(map((data: any) => data));
  }

  updateScheme(scheme: Scheme): Observable<Scheme> {
    console.log("update data ",scheme);
    return this.http.patch<Scheme>(`${this.serviceUrl}/${scheme.id}`, scheme);
  }

  addScheme(scheme: Scheme): Observable<Scheme> {
    return this.http.post<Scheme>(`${this.serviceUrl}/add`, scheme);
  }

  deleteScheme(id: number): Observable<Scheme> {
    return this.http.delete<Scheme>(`${this.serviceUrl}/${id}`);
  }
/*
  deleteUsers(schemes: Scheme[]): Observable<Scheme[]> {
    return forkJoin(
      schemes.map((scheme) =>
        this.http.delete<Scheme>(`${this.serviceUrl}/${scheme.id}`)
      )
    );
  }*/
}