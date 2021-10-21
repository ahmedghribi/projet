import { Category } from './../category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  public category: Category;
  form: FormGroup;

  constructor(
    public CategoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['CatID'];
    this.CategoryService.find(this.id).subscribe(data=>{
      this.category = data;
      console.log(this.category);
    }); 

 
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.CategoryService.update(this.id, this.form.value).subscribe(res => {
         console.log('category updated successfully!');
         this.router.navigateByUrl('category/index');
    })
  }
}
