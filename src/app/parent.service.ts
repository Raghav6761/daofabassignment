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
  getParentTransactions(): Observable<ParentTransaction[]> {
    return this.http.get<ParentTransaction[]>(this.parentUrl).pipe(
      map((response: any) => response.data)
    );
  }
}
