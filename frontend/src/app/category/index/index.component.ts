import { Category } from "./../category";
import { CategoryService } from "src/app/category/category.service";
import { Component, OnInit } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  
  listOfData: Category[] = [];
  searchValue = "";
  visible = false;
  listOfDisplayData: any;
  confirmModal?: NzModalRef;

  constructor(
    public CategoryService: CategoryService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.CategoryService.getAll().subscribe((data: Category[]) => {
      this.listOfData = data;
      console.log(this.listOfData);
      this.listOfDisplayData = [...this.listOfData];
    });
  }

  deleteCategory(id: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: "Do you Want to delete this category ?",
      nzOnOk: () =>
        this.CategoryService.delete(id).subscribe(res => {
          this.listOfData = this.listOfData.filter(item => item.id !== id);
          console.log("Product deleted ");
          this.CategoryService.getAll().subscribe((data: Category[]) => {
            this.listOfData = data;
            console.log(this.listOfData);
            this.listOfDisplayData = [...this.listOfData];
          });
        })
    });
  }

  reset(): void {
    this.searchValue = "";
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: Category) => item.name.indexOf(this.searchValue) !== -1
    );
  }

}
