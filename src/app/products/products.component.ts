import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public products: Array<Product> = [];
  public keyword: string="";

  constructor(private productService:ProductService){}
  
  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next : data=> {
        this.products = data
    },
      error : err =>{
        console.error('Error updating products:', err);
      }
   })
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
    .subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      },
      error: err => {
        console.error('Error updating product:', err);
      }
    });
  }

  handleDelete(product: Product) {
     if (confirm("Etes-vous sûr de vouloir supprimer ?")) {
      // Appelle le service pour supprimer le produit
      this.productService.deleteProduct(product).subscribe({
        next: value => {
         this.products = this.products.filter(p => p.id != product.id);
        }
      });
    }
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next:data=>{this.products=data;}
    });
    }
  
  
}
