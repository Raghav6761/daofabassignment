import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParentService } from '../parent.service';
import { ParentTransaction } from '../parent.model';
import { ChildTransaction } from '../child/child.model';
import { ChildService } from '../child.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  parentTransactions: ParentTransaction[] = [];
  childpaymentTransactions: ChildTransaction[] = [];
  childPayments = 0;
  currentPage: number = 1;
  sortDirection: string = 'asc';

  constructor(private router: Router, private parentService: ParentService, private childService: ChildService){}

  ngOnInit(): void {
    this.getParentTransactions();
  }

  // There are parent service fetches the transaction from parents.json and then is adjusted according to what we have in child.json
  // Child.json imports only the transactions that are in common with parent.json, this way we only have add in each.

  getParentTransactions(): void{
    this.parentService.getParentTransactions(this.currentPage, this.sortDirection).subscribe(
      (transactions: ParentTransaction[])=>{
        this.parentTransactions = transactions;

        this.parentTransactions.forEach(ParentElement => {
          this.childService.getChildTransactions(ParentElement.id).subscribe(
            (childTransactions: ChildTransaction[]) => {
              this.childPayments = 0;
              this.childpaymentTransactions = childTransactions;
              childTransactions.forEach(element => {
                this.childPayments += Number(element.paidAmount)
              });
              ParentElement.totalPaidAmount = this.childPayments;
            },
            (error: any) => {
              console.log('Error retrieving child transactions:', error);
            }
          );
        });

      },
      (error) =>{
        console.log('Error Fetching Parent Transcations: ', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getParentTransactions();
  }

  onSortChange(): void {
    // Toggle the sort direction between 'asc' and 'desc'
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getParentTransactions();
  }

  childTransactions(id: string): void{
    this.router.navigate(['child', id])
  }
}
