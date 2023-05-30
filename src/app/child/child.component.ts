import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../child.service';
import { ChildTransaction } from './child.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit{
  childTransactions: ChildTransaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService
  ) {}

  ngOnInit(): void {
    this.loadChildTransactions();
  }

  loadChildTransactions(): void {
    const parentId = this.route.snapshot.paramMap.get('parentId');
    console.log('the parentId', parentId);
    this.childService.getChildTransactions(parentId).subscribe(
      (transactions: ChildTransaction[]) => {
        this.childTransactions = transactions;
      },
      (error: any) => {
        console.log('Error retrieving child transactions:', error);
      }
    );
  }
}
