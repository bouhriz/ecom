import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any>=[
    {title:"Home", route:"/home", icon : "bi-house-door"},
    {title:"products", route:"/products", icon : "bi-box"},
    {title:"New Product", route:"/new-product", icon : "bi-plus-circle"}
  ]
  
  currentAction :any;

  constructor(public appStateService:AppStateService){}

  setCurrentAction(action: any) {
    this.currentAction=action;
    }

}
