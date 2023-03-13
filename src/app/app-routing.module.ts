import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoodTruckComponent } from './add-food-truck/add-food-truck.component';
import { FoodTruckComponent } from './food-truck/food-truck.component';

const routes: Routes = [
  {
    path: '',
    component: FoodTruckComponent
  },
  {
    path: 'add-food-truck',
    component: AddFoodTruckComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
