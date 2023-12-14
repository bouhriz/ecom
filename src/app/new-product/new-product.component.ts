import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{

  public productForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private productService:ProductService){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name:this.formBuilder.control(''),
      price:this.formBuilder.control(''),
      description:this.formBuilder.control(''),
      checked:this.formBuilder.control(false)
    });     
  }

  saveProduct() {
    let product:Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next:data=>{
        alert(JSON.stringify(data));

      },error:err=>{
        console.error("error :"+err);
      }
    });
    }

}
