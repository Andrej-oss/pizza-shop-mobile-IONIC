import { Component, OnInit } from '@angular/core';
import {SnackService} from '../../services/snackDao/snack.service';
import {Snack} from '../../models/Snack';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.page.html',
  styleUrls: ['./snack.page.scss'],
})
export class SnackPage implements OnInit {
snacks: Snack[];
  url = 'http://localhost:8080/snack/';
  constructor(private snackService: SnackService) { }

  ngOnInit() {
    this.snackService.getAllSnacks().subscribe(data => this.snacks = data);
  }

}
