import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

export interface Hotel{
  imageUrl: string,
  title: string,
  description: string,
  roomCost: number,
  hasParking: boolean,
  address: string,
  phone: string
}

@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html'
})
export class HotelPage {
  hotel: Hotel;

  constructor(params: NavParams) {
    this.hotel = params.data.hotel;
  }
}