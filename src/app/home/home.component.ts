import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item, Items } from '../interface/items.interface';
import { AuthService } from '../service/auth.service';
import { ItemsService } from '../service/items.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalItems =  new FormControl(10, [Validators.required, Validators.min(1)]);
  items: Item[];
  user = null;
  basketItems = [];

  constructor(private itemsService: ItemsService, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data => this.user = data);
    this.itemsService.getItems().subscribe(({items, basket})=>{
      this.items = items;
      this.basketItems = basket;
    });
  }

  addItem(item){
    if(this.user.isAdmin){
      this.basketItems.unshift(item.name);
      item.count -= 1; 
      this.saveItems();
    } else {
      this._snackBar.open(`Admin only can have access to add bastet`, '', {
        duration: 2000,
      });
    }
  }

  removeItem(item){
    if(this.basketItems[0] === item.name){
      item.count += 1; 
      this.basketItems.shift();
      this.saveItems();
    } else {
      this.basketErrorMessage();
    }
  }

  basketErrorMessage(){
    this._snackBar.open(`Cannot remove fruits otherthan last added fruit - ${this.basketItems[0]}`, '', {
      duration: 2000,
    });
  }

  saveItems(){
    if(this.totalItems.valid){
      this.itemsService.updateItems({items: this.items, basket: this.basketItems});
    }
  }

  logout(){
    this.authService.logOut().subscribe(data=>{
      this.router.navigate(['login']);
    });
  }

  getItemClass(item){
    let className = '';
     switch(item){
      case "Apple":
         className = 'bg-red';
         break;
      case "Orange":
        className = "bg-orange"
         break;
      case "Grape":
        className = "bg-grape"
        break;

     }
     return className;
  }
}
