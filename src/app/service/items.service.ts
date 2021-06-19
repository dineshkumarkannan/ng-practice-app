import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { Items } from './../interface/items.interface';

const Items: Items = {
  "items": [{
    "name": "Apple",
    "count": 10
  },
  {
    "name": "Orange",
    "count": 10
  },
  {
    "name": "Grape",
    "count": 10
  }],
  "basket":[
    // "Apple", "Orange", "Grape", "Apple"
  ]
};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor() { }

  getItems() {
    let items: Items = Items;
    if(localStorage.getItem('allItems')){
      items = JSON.parse(localStorage.getItem('allItems'));
    }
    return of(items);
  }

  updateItems(data: Items){
    localStorage.setItem('allItems', JSON.stringify(data));
    return of({success: true});
  }
}
