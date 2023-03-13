import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FoodTruckDataSource } from '../dataSource/food-truck.datasource';
import { FoodTruckService } from '../services/food-truck.service';
import { SortOrder } from '../shared/enum';

@Component({
  selector: 'app-food-truck',
  templateUrl: './food-truck.component.html',
  styleUrls: ['./food-truck.component.scss']
})
export class FoodTruckComponent implements OnInit, AfterViewInit {

  displayedColumnsMain: string[] = ['select', 'id', 'truckName', 'date', 'createdTs', 'updatedTs'];
  dataSourceMain: FoodTruckDataSource;

  displayedColumnsToday: string[] = ['truckName', 'date'];
  dataSourceToday: FoodTruckDataSource;

  selection = new SelectionModel<Element>(true, []);

  sortOrderAsc = SortOrder.ASC;

  @ViewChild('paginatorMain') paginatorMain: MatPaginator;
  @ViewChild('paginatorToday') paginatorToday: MatPaginator;
  @ViewChild(MatSort) sortMain: MatSort;

  constructor(private foodTruckService: FoodTruckService, private router: Router) { }

  ngOnInit(): void {
    this.dataSourceMain = new FoodTruckDataSource(this.foodTruckService);
    this.dataSourceMain.loadMainForm('');

    this.dataSourceToday = new FoodTruckDataSource(this.foodTruckService);
    this.dataSourceToday.loadTodayForm();
  }

  ngAfterViewInit(): void {
    this.paginatorMain.page
      .pipe(
        tap(() => this.loadMain())
      )
      .subscribe();

    this.paginatorToday.page
      .pipe(
        tap(() => this.loadToday())
      )
      .subscribe();
  }

  loadMain(): void {
    this.selection.clear();
    this.dataSourceMain.loadMainForm(
      '',
      SortOrder.ASC,
      this.paginatorMain.pageIndex,
      this.paginatorMain.pageSize);
  }

  loadToday(): void {
    this.dataSourceToday.loadTodayForm(
      this.paginatorToday.pageIndex,
      this.paginatorToday.pageSize);
  }

  addData(): void {
    this.router.navigate(['add-food-truck']);
  }

  removeData(): void {
    this.foodTruckService.deleteFoodTruck(this.selection.selected[0].id).subscribe(foodTruck => {
      this.loadMain();
    });
  }

}
