import { FoodTruckModel } from './food-truck.model';

export interface FoodTruckResponse {
  data: FoodTruckModel[];
  count: number;
}
