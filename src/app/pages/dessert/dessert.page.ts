import { Component, OnInit } from '@angular/core';
import {DessertService} from '../../services/dessertDao/dessert.service';
import {Dessert} from '../../models/Dessert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.page.html',
  styleUrls: ['./dessert.page.scss'],
})
export class DessertPage implements OnInit {
desserts: Dessert[];
  url = 'http://localhost:8080/dessert/';
  constructor(private dessertService: DessertService, private router: Router) { }

  ngOnInit() {
    this.dessertService.getAllDessert().subscribe(data => this.desserts = data);
  }

}
