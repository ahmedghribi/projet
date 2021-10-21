import { Category } from './../category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  Category: Category[] = [];
  selectedValue = null;

  constructor(public CategoryService :CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    });
  }

  get f() {  
    return this.form.controls;
  }
  submit(){
    console.log(this.form.valid);
    
    this.CategoryService.create(this.form.value).subscribe(res => {
         console.log('category created successfully!');
         this.router.navigateByUrl('category/index');
    })
  }

}
