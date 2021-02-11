import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html'
})
export class HotelPage {
  hotel;

  constructor(params: NavParams) {
    this.hotel = params.data.hotel;
  }
}