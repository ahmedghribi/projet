import { ProductService } from "./../../product/product.service";
import { ArticleInCategory } from "./../article-in-category";
import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import { Product } from "./../../product/product";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  ArticleInCategory: ArticleInCategory[] = [];
  Product: Product[] = [];

  CategoryNames: any[] = [];
  CategoryDatas: any[] = [];
  CategoryColors: any[] = [];
  chartColors: any[] = [];
  totalCategory: any = 0;
  totalProduct: any = 0;

  chartOptions = {
    responsive: true
  };

  chartLegend = true;
  chartPlugins = [];

  constructor(
    public DashboardService: DashboardService,
    public ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.ProductService.getAll().subscribe((data: Product[]) => {
      this.Product = data;
      this.totalProduct = data.length;
      console.log(this.Product);
    });
    
    let color = 100;
    this.DashboardService.getAll().subscribe((data: ArticleInCategory[]) => {
      this.ArticleInCategory = data;
      this.totalCategory = data.length;
      let colorDivider = color / data.length;
      data.forEach(element => {
        this.CategoryNames.push(element.CategoryName);
        this.CategoryDatas.push(element.NumberArticles);
        this.CategoryColors.push("rgb(24 144 255 / " + color + "%)");
        color = color - colorDivider;
        this.chartColors = [
          {
            backgroundColor: this.CategoryColors
          }
        ];
      });
      console.log(this.chartColors);
    });
  }
}
