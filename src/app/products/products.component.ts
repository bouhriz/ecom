import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService:ProductService, private router:Router, public appStateService : AppStateService){}
  
  ngOnInit(){
    this.searchProducts();
  }

  searchProducts(){
    this.appStateService.setProductState({
      status: "LOADING"
    });
    this.productService.searchProducts(this.appStateService.productState.keyword,this.appStateService.productState.currentPage,this.appStateService.productState.pageSize).subscribe({
      next : (response)=> {
        let products = response.body as Product[];
        let totalProducts:number = parseInt(response.headers.get('x-total-count')!); // Ignore null with !
        //this.appStateService.productState.totalProducts=totalProducts;
        let totalPages=Math.floor(totalProducts/this.appStateService.productState.pageSize);
        if(totalProducts % this.appStateService.productState.pageSize!=0){
          ++totalPages;
        }
        this.appStateService.setProductState({
          products:products,
          totalProducts:totalProducts,
          totalPages:totalPages,
          status: "LOADED"
        })
    },
      error : err =>{
        this.appStateService.setProductState({
          status: "ERROR",
          errorMessage:"An error occurred. Please try again."
        });
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
          this.appStateService.productState.products = this.appStateService.productState.products.filter((p:any) => p.id != product.id);
        }
      });
    }
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`)

    }

    handleGoToPage(page: number) {
      this.appStateService.productState.currentPage=page;
      this.searchProducts();
      }
}
