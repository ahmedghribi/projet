import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  Product: Product[] = [];
  constructor(public ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getAll().subscribe((data: Product[])=>{
      this.Product = data;
      console.log(this.Product);
    })
  }

  deleteProduct(id:any){
    this.ProductService.delete(id).subscribe(res => {
         this.Product = this.Product.filter(item => item.id !== id);
         console.log('Person deleted successfully!');
    })
  }

}
