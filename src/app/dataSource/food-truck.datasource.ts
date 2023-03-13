import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FoodTruckModel } from '../model/food-truck.model';
import { FoodTruckService } from '../services/food-truck.service';
import { SortOrder } from '../shared/enum';

export class FoodTruckDataSource implements DataSource<FoodTruckModel> {
  private foodTruckSubject = new BehaviorSubject<FoodTruckModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();

  constructor(private foodTruckService: FoodTruckService) { }

  connect(collectionViewer: CollectionViewer): Observable<FoodTruckModel[]> {
    return this.foodTruckSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.foodTruckSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadMainForm(name: string, sortDirection: SortOrder = SortOrder.ASC, pageIndex = 0, pageSize = 10): void {
    this.loadingSubject.next(true);

    this.foodTruckService.getFiltered(name, sortDirection, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((foodTruck: any) => {
        this.foodTruckSubject.next(foodTruck.data);
        this.countSubject.next(foodTruck.count);
      });
  }

  loadTodayForm(pageIndex = 0, pageSize = 5): void {
    this.loadingSubject.next(true);

    this.foodTruckService.getToday(pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((foodTruck: any) => {
        this.foodTruckSubject.next(foodTruck.data);
        this.countSubject.next(foodTruck.count);
      });
  }
}
