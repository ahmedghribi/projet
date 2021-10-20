import { Category } from './../../category/category';
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "src/app/category/category.service";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  Category: Category[] = [];

  constructor(public ProductService: ProductService,public CategoryService :CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      category_id: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$") ]),
      image: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")])
    });
    this.CategoryService.getAll().subscribe((data: Category[])=>{
      this.Category = data;
      console.log(this.Category);
    })
  }
  get f() {  
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    this.ProductService.create(this.form.value).subscribe(res => {
         console.log('Product created successfully!');
         this.router.navigateByUrl('product/index');
    })
  }
}
