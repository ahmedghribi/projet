import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductService } from "../product.service";
import { Category } from './../../category/category';
import { CategoryService } from "src/app/category/category.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  id: number;
  public product: Product;
  form: FormGroup;
  Category: Category[] = [];

  constructor(
    public ProductService: ProductService,
    public CategoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['productID'];
    this.ProductService.find(this.id).subscribe(data=>{
      this.product = data;
      console.log(this.product);
    }); 

    this.CategoryService.getAll().subscribe((data: Category[])=>{
      this.Category = data;
      console.log(this.Category);
    })

    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      category_id: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$") ]),
      price: new FormControl("", [Validators.required])
    });
    
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.ProductService.update(this.id, this.form.value).subscribe(res => {
         console.log('product updated successfully!');
         this.router.navigateByUrl('product/index');
    })
  }

}
