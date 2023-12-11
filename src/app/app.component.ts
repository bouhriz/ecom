import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions : Array<any>=[
    {title:"Home", route:"/home", icon : "bi-house-door"},
    {title:"products", route:"/products", icon : "bi-box"},
    {title:"New Product", route:"/new-product", icon : "bi-plus-circle"}
  ]
  
  currentAction :any;

  setCurrentAction(action: any) {
    this.currentAction=action;
    }
}
