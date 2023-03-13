import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FoodTruckService } from '../services/food-truck.service';

@Component({
  selector: 'app-add-food-truck',
  templateUrl: './add-food-truck.component.html',
  styleUrls: ['./add-food-truck.component.scss']
})
export class AddFoodTruckComponent implements OnInit {

  addTruckForm: FormGroup;
  today = new Date();

  constructor(private formBuilder: FormBuilder,
              private foodTruckService: FoodTruckService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.addTruckForm = this.formBuilder.group({
      truckName: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  save(): void {
    this.foodTruckService.saveFoodTruck(this.addTruckForm.value).subscribe((saved) => {
      if (saved) {
        this.router.navigate(['']);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
