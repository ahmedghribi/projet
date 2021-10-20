import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  listOfData: Product[] = [];
  searchValue = "";
  visible = false;
  listOfDisplayData : any;

  constructor(public ProductService: ProductService) {}

  ngOnInit(): void {
    this.ProductService.getAll().subscribe((data: Product[]) => {
      this.listOfData = data;
      console.log(this.listOfData);
      this.listOfDisplayData = [...this.listOfData];
    });
  }
  deleteProduct(id: any) {
    this.ProductService.delete(id).subscribe(res => {
      this.listOfData = this.listOfData.filter(item => item.id !== id);
      console.log("Person deleted successfully!");
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
