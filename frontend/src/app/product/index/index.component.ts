import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  listOfData: Product[] = [];
  searchValue = "";
  visible = false;
  listOfDisplayData: any;
  confirmModal?: NzModalRef;

  constructor(
    public ProductService: ProductService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.ProductService.getAll().subscribe((data: Product[]) => {
      this.listOfData = data;
      console.log(this.listOfData);
      this.listOfDisplayData = [...this.listOfData];
    });
  }
  deleteProduct(id: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: "Do you Want to delete this product ?",
      nzOnOk: () =>
        this.ProductService.delete(id).subscribe(res => {
          this.listOfData = this.listOfData.filter(item => item.id !== id);
          console.log("Product deleted ");
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
      (item: Product) => item.title.indexOf(this.searchValue) !== -1
    );
  }
}
