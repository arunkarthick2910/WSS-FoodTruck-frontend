import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { FoodTruckModel } from '../model/food-truck.model';
import { Observable } from 'rxjs';
import { FoodTruckResponse } from '../model/food-truck-response.dto';
import { catchError, map } from 'rxjs/operators';
import { FoodTruckRequest } from '../model/food-truck.request.dto';

@Injectable({
  providedIn: 'root'
})
export class FoodTruckService {

  private readonly SERVER = 'http://localhost:3000';

  private readonly URL_FOOD_TRUCK = `${this.SERVER}/food-truck`;
  private readonly URL_GET_FOOD_TRUCK_FILTERED = `${this.SERVER}/food-truck/filter`;
  private readonly URL_GET_FOOD_TRUCK_TODAY = `${this.SERVER}/food-truck/today`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<FoodTruckModel[]> {
    return this.http.get<FoodTruckModel[]>(this.URL_FOOD_TRUCK);
  }

  getFiltered(name: string, sortOrder: string, pageIndex: number, pageSize: number): Observable<FoodTruckResponse> {
    name = name || '';
    return this.http.get<FoodTruckResponse>(this.URL_GET_FOOD_TRUCK_FILTERED, {
      params: new HttpParams()
        .set('name', name)
        .set('sortOrder', sortOrder)
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getToday(pageIndex: number, pageSize: number): Observable<FoodTruckResponse> {
    return this.http.get<FoodTruckResponse>(this.URL_GET_FOOD_TRUCK_TODAY, {
      params: new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  saveFoodTruck(foodTruckRequest: FoodTruckRequest): Observable<FoodTruckModel> {
    return this.http.post<FoodTruckModel>(this.URL_FOOD_TRUCK, foodTruckRequest);
  }

  deleteFoodTruck(id: string): Observable<FoodTruckModel> {
    return this.http.delete<FoodTruckModel>(this.URL_FOOD_TRUCK, {
      params: new HttpParams()
        .set('id', id)
    });
  }
}
