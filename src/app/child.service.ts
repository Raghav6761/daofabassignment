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

  getChildTransactions(parentid: string): Observable<ChildTransaction[]> {
    const childUrl = 'assets/child.json'; // Replace with the actual path to your child.json file
    return this.http.get<ChildTransaction[]>(childUrl).pipe(
      map((response: any) => response.data.filter((child: ChildTransaction) => child.parentid === Number(parentid)))
    );
  }

}
