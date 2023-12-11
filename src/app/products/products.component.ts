import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Array<any> = [
    { id: 1, name: 'Product 1', price: 29.99, description: 'Description for Product 1',checked:true },
    { id: 2, name: 'Product 2', price: 39.99, description: 'Description for Product 2',checked:false  },
    { id: 3, name: 'Product 3', price: 49.99, description: 'Description for Product 3',checked:true  }
  ];


  handleCheckProduct(product: any) {
    product.checked=!product.checked;
    }

}
