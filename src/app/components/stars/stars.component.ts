import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rating} from '../../models/Rating';
import {ThemeService} from '../../../theme/behaviour-subject/theme.service';
import {PizzaService} from '../../services/pizzaDao/pizza.service';
import {RatingService} from '../../services/ratingDao/rating.service';
import {ToasterServiceService} from '../../services/toaster/toaster-service.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
  averageRating: number;
  @Input()
  pizzaRating: Rating[];
  @Input()
  pizzaId: number;
  @Output()
  ratedPizza: EventEmitter<Rating> = new EventEmitter<Rating>();
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  rating: Rating;
  isRatedPizza: boolean;
  constructor(public themeService: ThemeService,
              private toaster: ToasterServiceService,
              private ratingService: RatingService) { }

  ngOnInit() {
    this.getAverageRating();
    this.isUserRatedPizza();
  }
  isUserRatedPizza(): void{
    this.isRatedPizza = !!this.pizzaRating.find(value => value.userId === this.themeService.data.value.userId);
  }

  countStar(star: number) {
    this.selectedValue = star;
    this.rating = {value: star, userId: this.themeService.data.value.userId};
    this.ratingService.saveRating(this.pizzaId, this.rating).subscribe(data => {
      this.themeService.data.value.message = 'Thank you for your vote';
      this.toaster.presentToast();
      this.isRatedPizza = true;
      this.pizzaRating = data;
      this.getAverageRating();
    });
  }

  getAverageRating(): void{
    if (this.pizzaRating.length){
      this.averageRating = this.pizzaRating.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0);
      this.averageRating = Math.round(this.averageRating / this.pizzaRating.length);
    }
  }
}
