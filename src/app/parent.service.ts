import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { ParentTransaction } from './parent.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private parentUrl = 'assets/Parent.json';

  constructor(private http: HttpClient) {}

  // functions call the json data using HttpClient and returns only response.data, because that's all we need.
  // getParentTransactions(): Observable<ParentTransaction[]> {
  getParentTransactions(page: number, sort: string): Observable<ParentTransaction[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', '2')
      .set('_sort', sort);
    return this.http.get<ParentTransaction[]>(`${this.parentUrl}`, { params }).pipe(
      map((response: any) => response.data)
    );
  }

  getAllParentTransactions(): Observable<ParentTransaction[]> {
    return this.http.get<ParentTransaction[]>(this.parentUrl).pipe(
      map((response: any) => response.data)
    );
  }
}
