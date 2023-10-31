import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoaderService } from './loader.service';
import { Member } from '../Model/member';
import { map } from 'rxjs/operators';
import { Dependant } from '../Model/dependant';
import { ClaimOPD } from '../Model/claimOPD';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  getClaims(claimType: string, year: number, empNo: string, claimStatus: string, 
    filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
      return this.http.get(`${this.API_URL}/claim/get`, {
        params: new HttpParams()
          .set('claimType', claimType)
          .set('year', year)
          .set('empNo', empNo)
          .set('claimStatus', claimStatus)
          .set('filter', filter)
          .set('sortOrder', sortDirection)
          .set('pageNumber', pageIndex.toString())
          .set('pageSize', pageSize.toString())
      }).pipe<ClaimOPD[]>(map(
        (res: any) => res)); 
  }
  private API_URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getOPD(empNo: any, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<ClaimOPD[]> {
    return this.http.get(`${this.API_URL}/claim/get`, {
      params: new HttpParams()
        .set('type', "opd")
        .set('empNo', empNo)
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe<ClaimOPD[]>(map(
      (res: any) => res)); //res["payload"]
  }
  /*
    getOPD(empNo: any): Observable<ClaimOPD[]> {
      return this.http
        .get(`${this.API_URL}/claim/opd/get/${empNo}`)
        .pipe<ClaimOPD[]>(map((data: any) => data));
    }*/
  saveOPD(claimOPD: any): Observable<number> {
    return this.http.post(`${this.API_URL}/claim/opd`, claimOPD)
      .pipe<number>(map((data: any) => data));
  }
  saveOPDtest(claimOPD: any) {
    return this.http.post(`${this.API_URL}/claim/opd`, claimOPD);
  }

  isGuest(year: any, empNo: any): Observable<Map<String, Object>> {
    return this.http
      .get(`${this.API_URL}/guest/${year}/${empNo}`)
      .pipe<Map<string, Object>>(map((data: any) => data));
  }

  getRelationShip(rs: string): Observable<string[]> {
    return this.http
      .get(`${this.API_URL}/member/relationship/${rs}`)
      .pipe<string[]>(map((data: any) => data));
  }

  getMember(empNo: any): Observable<Member> {
    //return this.http.get(`${this.API_URL}/member/details`, data);
    return this.http
      .get(`${this.API_URL}/member/${empNo}`)
      .pipe<Member>(map((data: any) => data));
  }

  getHRDetails(empNo: any): Observable<any> {
    //return this.http.get(`${this.API_URL}/member/details`, data);
    return this.http.get(`${this.API_URL}/hr/${empNo}`);

  }
  getUser(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/member/data`, data);
  }
  getDependant(name: any): Observable<any> {
    return this.http
      .get(`${this.API_URL}/dependant/${name}`)
      .pipe<Dependant>(map((data: any) => data));
  }

  login(data: any): Observable<any> {
    console.log(data)
    return this.http.post(`${this.API_URL}/member/signin`, data);
  }
  /*xregister(data: any):Observable<any>{
    console.log("call Register method in auth service");
    console.log(data);
    return this.http.get(`${this.API_URL}/user/report`);
    //return this.http.post(`${this.API_URL}/user/signup`, data);
  }*/

  register(data: any) {
    console.log("call Register method in auth service");
    this.http.post(`${this.API_URL}/member/signup`, data, { responseType: 'blob' }).subscribe(
      (response: any) => {
        console.log(response.fileNme);
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        //let fname = response.get("file name").ToString();
        //console.log(fname);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', "Application.pdf");
        document.body.appendChild(downloadLink);
        console.log(downloadLink)
        downloadLink.click();
      }
    )
  }
}