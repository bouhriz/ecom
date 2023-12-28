import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public products: Array<Product> = [];
  public keyword: string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService:ProductService, private router:Router){}
  
  ngOnInit(){
    this.searchProducts();
  }

  searchProducts(){
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next : (response)=> {
        this.products = response.body as Product[];
        let totaleProducts:number = parseInt(response.headers.get('x-total-count')!); // Ignore null with !
        this.totalPages=Math.floor(totaleProducts/this.pageSize);
        if(totaleProducts % this.pageSize!=0){
          this.totalPages++;
        }
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

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`)

    }

    handleGoToPage(page: number) {
      this.currentPage=page;
      this.searchProducts();
      }
}
