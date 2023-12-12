import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Array<any> = [];

  constructor(private http:HttpClient){}
  
  ngOnInit(){
    
    this.http.get<Array<any>>("http://localhost:3000/products").subscribe({
      next : data=> {
        this.products = data
    },
      error : err =>{
        console.log('ERROR')
      }
   })
  }

  handleCheckProduct(product: any) {
    this.http.patch<any>(`http://localhost:3000/products/${product.id}`, { checked: !product.checked }).subscribe({
      next : updatedProduct => {
         product.checked=!product.checked;
        }
      })
  }
}
