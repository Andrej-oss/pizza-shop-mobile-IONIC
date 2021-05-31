import { Component, OnInit } from '@angular/core';
import {SnackService} from '../../../services/snackDao/snack.service';
import {Snack} from '../../../models/Snack';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.page.html',
  styleUrls: ['./snack.page.scss'],
})
export class SnackPage implements OnInit {
snacks: Snack[];
  url = 'http://localhost:8080/snack/';
  constructor(private snackService: SnackService,
              private router: Router,
              public themeService: ThemeService) { }

  ngOnInit() {
    this.snackService.getAllSnacks().subscribe(data => this.snacks = data);
  }

  onSnackDetail(id: number): void{
    this.router.navigate(['snack' + `/${id}`]);
  }
}
