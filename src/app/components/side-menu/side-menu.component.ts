import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  userNationalId:string = "29806201601918";
  userCreditCardNumber:string = "1546623855889741"

  constructor() { }

  ngOnInit(): void {
  }

}
