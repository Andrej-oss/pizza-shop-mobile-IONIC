import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
  @Input()
  averageRating;
  stars: number[] = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
    console.log(this.averageRating);
  }

}
