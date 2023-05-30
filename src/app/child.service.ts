import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ChildTransaction } from './child/child.model';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  childTransactions: ChildTransaction[] = [];

  constructor(private http: HttpClient) { }

  // functions call the json data using HttpClient and returns only response.data and then filters through the data based on our requirements.
  getChildTransactions(parentId: string): Observable<ChildTransaction[]> {
    const childUrl = 'assets/Child.json';
    return this.http.get<ChildTransaction[]>(childUrl).pipe(
      map((response: any) => response.data.filter((child: ChildTransaction) => Number(child.parentId) === Number(parentId)))
    );
  }

}
