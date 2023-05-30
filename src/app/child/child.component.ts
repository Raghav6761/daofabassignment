import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../child.service';
import { ChildTransaction } from './child.model';
import { ParentTransaction } from '../parent.model';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit{
  childTransactions: ChildTransaction[] = [];
  parentTransactions: ParentTransaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private parentService: ParentService
  ) {}

  ngOnInit(): void {
    this.loadParentTransactions();
  }

  // Calls all the parent transactions using parent service and then calls loadChildTransactions()
  loadParentTransactions(): void{
    this.parentService.getAllParentTransactions().subscribe(
      (transactions: ParentTransaction[])=>{
        this.parentTransactions = transactions;
        this.loadChildTransactions();
      },
      (error) =>{
        console.log('Error Fetching Parent Transcations: ', error);
      }
    );
  }

  // Calls for all the child transactions using child service
  loadChildTransactions(): void {
    let parentId = this.route.snapshot.paramMap.get('parentId');
    if (parentId !== null){
      this.childService.getChildTransactions(parentId).subscribe(
        (transactions: ChildTransaction[]) => {
          this.childTransactions = transactions;
          this.childTransactions.forEach(child => {
            this.parentTransactions.forEach(parent =>{
              if (parent.id == child.parentId){
                child.sender = parent.sender;
                child.receiver = parent.receiver;
                child.totalAmount = parent.totalAmount;
              }
            })
          });
        },
        (error: any) => {
          console.log('Error retrieving child transactions:', error);
        }
      );
    }
  }
}
