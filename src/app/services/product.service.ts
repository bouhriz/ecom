import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  searchProducts(keyword: string="",page:number,size:number){
    return  this.http.get(`http://localhost:3000/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:`response`});
  }

  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:3000/products/${product.id}`, { checked: !product.checked });
  }

  public deleteProduct(product:Product){
    return this.http.delete<Product>(`http://localhost:3000/products/${product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/products`,product);
  }

  getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`);
  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product);

  }


}
