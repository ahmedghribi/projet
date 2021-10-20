import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    IndexComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
