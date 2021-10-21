import { ArticleInCategory } from "./../article-in-category";
import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  ArticleInCategory: ArticleInCategory[] = [];
  CategoryNames:any[]= [];
  CategoryDatas:any[]= [];
  CategoryColors:any[]= [];
  chartColors:any[]= [];

  chartOptions = {
    responsive: true
  };


  chartLegend = true;
  chartPlugins = [];

  constructor(public DashboardService: DashboardService) {}

  ngOnInit(): void {
    let color = 100;
    this.DashboardService.getAll().subscribe((data: ArticleInCategory[]) => {
      this.ArticleInCategory = data;
      let colorDivider = color/data.length;
      data.forEach(element => {
        this.CategoryNames.push(element.CategoryName);
        this.CategoryDatas.push(element.NumberArticles);
        this.CategoryColors.push("rgb(26, 144, 255 / " + color + "%)");
        color = color -colorDivider
        this.chartColors = [
          {
            backgroundColor: this.CategoryColors,
          }
        ];
      });
     console.log(  this.chartColors);
     
      
    });

  }
}
