import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HotelPage } from '../hotel/hotel';
@Component({
  selector: 'page-hotels',
  templateUrl: 'hotels.html'
})
export class HotelsPage {
  hotels: Array<{
    imageUrl: string,
    title: string,
    description: string,
    roomCost: number,
    hasParking: boolean,
    address: string,
    phone: string
  }>;
  filteredHotels: Array<{
    imageUrl: string,
    title: string,
    description: string,
    roomCost: number,
    hasParking: boolean,
    address: string,
    phone: string
  }>;

  minPriceOfHotel: number;
  maxPriceOfHotel: number;

  startPriceIntentionOfuser: number;
  finishPriceIntentionOfuser: number;
  hasParkingIntentionOfuser: boolean;

  constructor(public navCtrl: NavController) {
    this.hotels = [
      {
        imageUrl: 'https://img.gazeta.ru/files3/837/4860837/hotel-pic668-668x444-62402.jpg',
        title: 'Будапешт',
        description: 'Московский отель "Будапешт"',
        roomCost: 5000,
        hasParking: true,
        address: 'Москва, ул. Петровские Линии, 2',
        phone: '8 (495) 729-35-01'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/640x400/extranet/50/1c/501c6211826d67319ab8503185fa4032ef4eafb2.jpeg',
        title: 'Космос',
        description: 'Гостиница "Космос"',
        roomCost: 3000,
        hasParking: true,
        address: 'Москва, пр-т Мира, 150',
        phone: '8 (495) 234-12-06'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/content/17/81/17811fdcaa6cd6d7067a4fb612c34318f5384b18.jpeg',
        title: 'Холидей Инн',
        description: 'Гостиница Холидей Инн Москва Лесная',
        roomCost: 3186,
        hasParking: true,
        address: 'Москва, Лесная ул., д. 15',
        phone: '+7 (495) 783-65-00'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/content/c3/4a/c34ae42a36c697c4541173edb886fe62ddcbad9c.jpeg',
        title: 'Турист',
        description: 'Гостиница Турист',
        roomCost: 1855,
        hasParking: true,
        address: 'Москва, Сельскохозяйственная улица 17, корпус 1, 2, 3, 4, 5, 6, 7',
        phone: '8 (800) 737-77-45'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/content/94/b6/94b6d34cb072bc74068be37094327e70117e9b0a.jpeg',
        title: 'Измайлово Бета',
        description: 'Отель Измайлово Бета',
        roomCost: 2223,
        hasParking: true,
        address: 'Москва, Измайловское шоссе, д.71, стр. 2Б',
        phone: '+7 (495) 792-98-98'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/extranet/d7/6c/d76cff19e6527c126729210d9d99a3b6ffc44f4e.jpeg',
        title: 'Подъезд №2',
        description: 'Мини-отель Подъезд №2',
        roomCost: 1987,
        hasParking: false,
        address: 'Москва, улица Воронцовская, д.21, стр.1',
        phone: '+7 (967) 013-00-47'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/extranet/8e/27/8e2701fde98ec200549833b2af684f5f1b2087bd.jpeg',
        title: 'Yum Yum',
        description: 'Гостевой Дом Yum Yum',
        roomCost: 2254,
        hasParking: false,
        address: ' Москва, улица Александра Невского, д. 27',
        phone: '+7 (910) 459-53-78'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/content/ca/fa/cafa1bd5db101dfd5e2566fedf5feb69c5faecc1.jpeg',
        title: 'Каприз',
        description: 'Отель Каприз',
        roomCost: 2999,
        hasParking: true,
        address: 'Москва, улица Краснодонская, д.2 А',
        phone: '+7 (495) 648-00-12'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/extranet/f9/61/f96150816dea7847629ddfe651a77706e5d2a1ea.jpeg',
        title: 'Caps Hotel',
        description: 'Отель Капсульный Caps Hotel',
        roomCost: 623,
        hasParking: true,
        address: 'Москва, Гагаринский переулок, д. 5/1',
        phone: '+7 (977) 919-09-97'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/1024x768/extranet/dd/6d/dd6dfb06f3e9948e1ae99bea840a4c0d05237c20.jpeg',
        title: 'На Беговой',
        description: 'Апартаменты на Беговой',
        roomCost: 1100,
        hasParking: false,
        address: 'Москва, Беговая улица, д. 13',
        phone: ''
      }
    ]

    this.filteredHotels = JSON.parse(JSON.stringify(this.hotels));

    this.minPriceOfHotel = this.knowMaxAndMinPriceOfHotel().minValue;
    this.maxPriceOfHotel = this.knowMaxAndMinPriceOfHotel().maxValue;

    this.initStartUIValues();
  }

  initStartUIValues() {
    this.startPriceIntentionOfuser = this.minPriceOfHotel;
    this.finishPriceIntentionOfuser = this.maxPriceOfHotel;
    this.hasParkingIntentionOfuser = false;
  }

  knowMaxAndMinPriceOfHotel() {
    let priceInterval = {
      minValue: null,
      maxValue: null
    }

    priceInterval.minValue = Math.min.apply(Math, this.hotels.map(function(o) { 
      return o.roomCost;  
    }));

    priceInterval.maxValue = Math.max.apply(Math, this.hotels.map(function(o) { 
      return o.roomCost;  
    }));

    return priceInterval;
  }

  handlePriceInput() {
    this.resetHotels();
    const isNecessityCheckPriceValidInterval = !this.checkEmptyValue();
    if (isNecessityCheckPriceValidInterval) {
      this.filterHotels(this.checkPriceValidInterval());
    } else {
      this.filterHotels(true);
    }
  }

  handleParkingCheckBox() {
    this.resetHotels();
    this.filterHotels(true);
  }

  resetHotels() {
    this.filteredHotels = JSON.parse(JSON.stringify(this.hotels));
  }

  filterHotels(validInterval: boolean) {
    if (validInterval) {
      this.filteredHotels = this.filteredHotels.filter((hotel) => {
      const filterParkingCondition = (this.hasParkingIntentionOfuser) ? this.filterByParking(hotel.hasParking) : true;
        return this.filterByPrice(hotel.roomCost) && filterParkingCondition;
      });
    }
    else {
      this.filteredHotels = [];
    }
  }

  filterByPrice(roomCost) {
    const filterStartPriceCondition = (Number(this.startPriceIntentionOfuser) === 0) ? true : (roomCost >= Number(this.startPriceIntentionOfuser));
    const filterFinishPriceCondition = (Number(this.finishPriceIntentionOfuser) === 0) ? true : (roomCost <= Number(this.finishPriceIntentionOfuser));

    return (filterStartPriceCondition && filterFinishPriceCondition);
  }

  filterByParking(hasParking) {
    return (hasParking === this.hasParkingIntentionOfuser);
  }

  checkPriceValidInterval() {
    return (Number(this.startPriceIntentionOfuser) <= Number(this.finishPriceIntentionOfuser));
  }

  checkEmptyValue() {
    return (!this.startPriceIntentionOfuser || !this.finishPriceIntentionOfuser)
  }

  openHotelPage(hotel) {
    console.log(this);
    console.log(this.navCtrl);
    console.log(HotelPage);
    console.log(hotel);
    this.navCtrl.push(HotelPage, {hotel: hotel});
  }
}
