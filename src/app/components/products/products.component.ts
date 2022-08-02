import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CatData } from 'src/app/Models/cat-data';
import { IProduct } from 'src/app/Models/iproduct';
import { Store } from 'src/app/Models/store';
import { ProductApiService } from 'src/app/service/product-api.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // providers:[ProductService] 
})
export class ProductsComponent implements OnInit , OnChanges {

  clientName:string = "menna elsayed";
  // productList:IProduct[];
  storeInfoClass : Store;
  dateNow:Date = new Date();

  
  productListCat:IProduct[] = [];
  @Input() receivedCatId:number = 0;
  @Output() allCatData:EventEmitter<any>;
  totalPrice:number = 0;
  @Output() totalPriceChanged:EventEmitter<number>;
  catData:CatData[] = [];


constructor(private productService:ProductService, private router:Router, private APIProductService:ProductApiService){

  this.totalPriceChanged = new EventEmitter<number>();
  this.allCatData = new EventEmitter<any>();
  this.storeInfoClass = new Store('ITI Store', ["Mansoura","Smart","Alex","Sohag"], '../../../assets/1.jpeg');
  // this.productList=[
  //   {ID:1 , Name:'Samsung' , Quantity:10 , Price:10000, Img:'../../../assets/1.jpeg' , CateogryID:1},
  //   {ID:2 , Name:'Iphone' , Quantity:1 , Price:30000 , Img:'../../../assets/1.jpeg' , CateogryID:1},
  //   {ID:3 , Name:'Oppo' , Quantity:0 , Price:7000 , Img:'../../../assets/1.jpeg' , CateogryID:1},
  //   {ID:10 , Name:'Lenovo' , Quantity:2 , Price:11000 , Img:'../../../assets/1.jpeg' , CateogryID:2},
  //   {ID:20 , Name:'HP' , Quantity:7 , Price:12000 , Img:'../../../assets/1.jpeg' , CateogryID:2},
  //   {ID:30 , Name:'Dell' , Quantity:1 , Price:15000 , Img:'../../../assets/1.jpeg' , CateogryID:2},
  //   {ID:100 , Name:'Lg' , Quantity:0 , Price:5000 , Img:'../../../assets/1.jpeg' , CateogryID:3},
  //   {ID:200 , Name:'Samsung' , Quantity:3 , Price:7000 , Img:'../../../assets/1.jpeg' , CateogryID:3},
  //   {ID:300 , Name:'Toshiba' , Quantity:2 , Price:9000 , Img:'../../../assets/1.jpeg' , CateogryID:3}
  // ]
  
}
  ngOnChanges(): void {
    // this.getProductOfCat();
    // this.productListCat = this.productService.getProductByCateogryID(this.receivedCatId);

    if(this.receivedCatId == 0){
      this.APIProductService.getAllProducts().subscribe(productList=>{
        this.productListCat = productList;
      })
    }
    else
    {
      this.APIProductService.getProductsByCatID(this.receivedCatId).subscribe(productList=>{
        this.productListCat = productList;
      })
    }
  }

  ngOnInit(): void {
    
    this.APIProductService.getAllProducts().subscribe(productList=>{
      this.productListCat = productList;
    })
    
  }

  // private getProductOfCat(){
  //   if(this.receivedCatId == 0){
  //     this.productListCat = Array.from(this.productList)
  //     return;
  //   }

  //   this.productListCat = this.productList.filter((item)=>
  //     item.CateogryID == this.receivedCatId
  //   )
  // }

  // showMsg:boolean = false;
  // showImage:boolean = true;
  // toggle(){
  //   this.showMsg =! this.showMsg;
  //   this.showImage =! this.showImage;

  // }

  increaseQuantity(i:IProduct , itemCount:any){

    return i.Quantity -= itemCount;
  }

  updateTotalPrice(itemPrice:number , itemCount:any){

    this.totalPrice += (itemPrice*+itemCount);
    // this.totalPrice += (itemPrice*Number(itemCount))
    // this.totalPrice += (itemPrice*parseInt(itemCount))
    // this.totalPrice += (itemPrice*itemCount as number)

    this.totalPriceChanged.emit(this.totalPrice);
  }

  getCatData(itemName:string , itemPrice:number , itemCount:any){

    this.catData.push({Name : itemName , Price:itemPrice, Count:itemCount});
    this.allCatData.emit(this.catData)
  }
  
  openProductDetails(itemID:number){
    this.router.navigate(['products',itemID])
  }

  getAllCat(){
    
    this.APIProductService.getAllCategories().subscribe(productList=>{
      this.productListCat = productList;
    })
  }
}
