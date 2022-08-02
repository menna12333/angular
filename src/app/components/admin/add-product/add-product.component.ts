import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICateogry } from 'src/app/Models/icateogry';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  catList:ICateogry[] = [];
  newProduct:IProduct = {} as IProduct;

  constructor(private APIProductService:ProductApiService, private router:Router) {
    this.APIProductService.getAllCategories().subscribe(productList=>{
      this.catList = productList
    })
  }

  ngOnInit(): void {
  }


  addNewProduct(){
    // let testProduct:IProduct = {
    //   ID:1000 , Name:'Redmi' , Quantity:10 , Price:5000 , Img:'../../../assets/1.jpeg' , CateoryID:1
    // }

    this.APIProductService.AddProduct(this.newProduct).subscribe({
      next:(product)=>{
        this.router.navigate(['/products']);
      },
      error:(err)=>{
        alert('Error');
      }
    })
  }
}
