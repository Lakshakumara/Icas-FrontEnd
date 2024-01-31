import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Member } from '../Model/member';
import { map } from 'rxjs/operators';
import { Dependant } from '../Model/dependant';
import { ClaimOPD } from '../Model/claimOPD';
import { Claim } from '../Model/claim';
import { Utils } from '../util/utils';
import { Scheme, SchemeTitles } from '../Model/scheme';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  getMembers(
    searchFor: string,
    searchText: string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http
      .get(`${this.API_URL}/member/get`, {
        params: new HttpParams()
          .set('empNo', '')
          .set('searchText', searchText)
          .set('searchFor', searchFor)
          .set('year', Utils.currentYear)
          .set('memberStatus', searchFor)
          .set('filter', filter)
          .set('sortOrder', sortDirection)
          .set('pageNumber', pageIndex.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe<Member[]>(map((res: any) => res));
  }

  getRelationShip(rs: string): Observable<string[]> {
    return this.http
      .get(`${this.API_URL}/member/relationship/${rs}`)
      .pipe<string[]>(map((data: any) => data));
  }

  getMember(empNo: any): Observable<Member> {
    return this.http
      .get(`${this.API_URL}/member/${empNo}`)
      .pipe<Member>(map((data: any) => data));
  }

  updateMember(criteria: string, data: any) {
    console.log('updateMember ', criteria, data);
    const data1 = { title: 'Angular PUT Request Example' };
    return this.http.post(`${this.API_URL}/member/signup`, data);
  }

  update(criteria: string, data: any): Observable<Number> {
    console.log('reg Update ', data);
    const x = this.http
      .put(`${this.API_URL}/member/update/${criteria}`, data)
      .pipe<Number>(map((data: any) => data));

    return x;
  }
  /*updateReg(criteria: string, data: any){
    console.log("reg Update ", data);
    return this.http.put(`${this.API_URL}/member/update/${criteria}`, data);
  }*/

  login(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.API_URL}/member/signin`, data);
  }

  register(data: any) {
    return this.http.post(`${this.API_URL}/member/signup`, data);
  }
  registert(data: any) {
    return this.http.post(`${this.API_URL}/member/signupt`, data);
  }
  getUser(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/member/data`, data);
  }

  /**
   *
   * @param claimType '%' for any
   * @param year
   * @param empNo '' for any
   * @param claimStatus '%' for any
   * @param filter
   * @param sortDirection
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getAllClaims(
    claimType: string = '%',
    year: number = 0,
    empNo: string = '',
    claimStatus: string = '%',
    filter: string = '',
    sortDirection: string = 'asc',
    pageIndex: number = 0,
    pageSize: number = 10
  ) {
    console.log('getAllClaims calls claimType= ', claimType);
    return this.http
      .get(`${this.API_URL}/claim/getAll`, {
        params: new HttpParams()
          .set('claimType', claimType)
          .set('year', year)
          .set('empNo', empNo)
          .set('claimStatus', claimStatus)
          .set('filter', filter)
          .set('sortOrder', sortDirection)
          .set('pageNumber', pageIndex.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe<Claim[]>(map((res: any) => res));
  }
  /**
   *
   * @param claimType
   * @param year 0 for neglect year
   * @param empNo '' for neglect Members
   * @param claimStatus
   * @param filter
   * @param sortDirection
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getClaims(
    claimType: string,
    year: number,
    empNo: string,
    claimStatus: string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    console.log('getClaims calls claimType= ', claimType);
    return this.http
      .get(`${this.API_URL}/claim/getAll`, {
        params: new HttpParams()
          .set('claimType', claimType)
          .set('year', year)
          .set('empNo', empNo)
          .set('claimStatus', claimStatus)
          .set('filter', filter)
          .set('sortOrder', sortDirection)
          .set('pageNumber', pageIndex.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe<ClaimOPD[]>(map((res: any) => res));
  }
  getPendingOPDClaims(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.getClaims(
      'opd',
      0,
      '',
      'pending',
      filter,
      sortDirection,
      pageIndex,
      pageSize
    );
  }

  private API_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getOPD(
    empNo: any,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<ClaimOPD[]> {
    return this.http
      .get(`${this.API_URL}/claim/get`, {
        params: new HttpParams()
          .set('type', 'opd')
          .set('empNo', empNo)
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe<ClaimOPD[]>(map((res: any) => res)); //res["payload"]
  }

  saveOPD(claimOPD: any): Observable<number> {
    return this.http
      .post(`${this.API_URL}/claim/opd`, claimOPD)
      .pipe<number>(map((data: any) => data));
  }
  updateClaim(claim: any) {
    return this.http
      .put(`${this.API_URL}/claim/update`, claim)
      .pipe<Number>(map((data: any) => data));
  }

  isGuest(year: any, empNo: any): Observable<Map<String, Object>> {
    return this.http
      .get(`${this.API_URL}/guest/${year}/${empNo}`)
      .pipe<Map<string, Object>>(map((data: any) => data));
  }

  getHRDetails(empNo: any): Observable<any> {
    return this.http.get(`${this.API_URL}/hr/${empNo}`);
  }

  getDependant(name: any): Observable<any> {
    return this.http
      .get(`${this.API_URL}/dependant/${name}`)
      .pipe<Dependant>(map((data: any) => data));
  }
  download(type: number, year: number, empNo: string): Observable<any> {
    console.log('download ', year, empNo);
    return this.http.get(
      `${this.API_URL}/download/application/${year}/${empNo}`,
      { responseType: 'blob' }
    );
  }
  /*update(criteria: string, data: any): Observable<Number> {
    console.log('reg Update ', data);
    const x = this.http
      .put(`${this.API_URL}/member/update/${criteria}`, data)
      .pipe<Number>(map((data: any) => data));

    return x;
  }*/
}
