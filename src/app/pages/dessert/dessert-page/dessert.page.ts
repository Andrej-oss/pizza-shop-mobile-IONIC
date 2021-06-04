import {Component, EventEmitter, OnInit} from '@angular/core';
import {DessertService} from '../../../services/dessertDao/dessert.service';
import {Dessert} from '../../../models/Dessert';
import {Router} from '@angular/router';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {APiURL} from '../../../config/configURL';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.page.html',
  styleUrls: ['./dessert.page.scss'],
})
export class DessertPage implements OnInit {
desserts: Dessert[];
  url = APiURL.dessertImage;
  constructor(private dessertService: DessertService,
              public themeService: ThemeService,
              private router: Router) { }

  ngOnInit() {
    this.dessertService.getAllDessert().subscribe(data => this.desserts = data);
  }

  chooseDessert(id: number): void{
    this.router.navigate([`dessert/${id}`]);
  }
}
