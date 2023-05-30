import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParentService } from '../parent.service';
import { ParentTransaction } from '../parent.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  parentTransactions: ParentTransaction[] = [];

  constructor(private router: Router, private parentService: ParentService){}

  ngOnInit(): void {
    this.getParentTransactions();
  }

  getParentTransactions(): void{
    this.parentService.getParentTransactions().subscribe(
      (transactions: ParentTransaction[])=>{
        this.parentTransactions = transactions;
      },
      (error) =>{
        console.log('Error Fetching Parent Transcations: ', error);
      }
    );
  }

  childTransactions(id: string): void{
    this.router.navigate(['child', id])
  }
}
