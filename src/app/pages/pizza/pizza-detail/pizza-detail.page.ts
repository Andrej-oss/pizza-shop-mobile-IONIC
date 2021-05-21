import {Component, Input, OnInit} from '@angular/core';
import {SizeService} from '../../../services/sizeDao/size.service';
import {ActivatedRoute} from '@angular/router';
import {SizePizza} from '../../../models/SizePizza';
import {Size} from '../../../models/Size';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {IngredientService} from '../../../services/ingredientDao/ingredient.service';
import {CommentService} from '../../../services/commentDao/comment.service';
import {Comment} from '../../../models/Comment';
import {Rating} from '../../../models/Rating';
import {RatingService} from '../../../services/ratingDao/rating.service';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.page.html',
  styleUrls: ['./pizza-detail.page.scss'],
})
export class PizzaDetailPage implements OnInit {
  pizzaId: number;
  sizeUrl = 'http://localhost:8080/size/image/';
  sizePizza: Size;
  pizzaDescription: string;
  classSize: string;
  isOpenPayment: boolean;
  comments: Comment[];
  isOpenComments: boolean;
  pizzaRating: Rating[];
  averageRating: number;
  constructor(private sizeService: SizeService,
              private ingredientService: IngredientService,
              public themeService: ThemeService,
              private ratingService: RatingService,
              private commentService: CommentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => this.pizzaId = data.id);
    this.isOpenPayment = false;
    this.isOpenComments = false;
    console.log(this.themeService.data.value.ingredients, this.themeService.data.value.ingredientsPizza);
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.SMALL).subscribe(data => this.sizePizza = data);
      this.pizzaDescription = this.themeService.data.value.pizzaDescription;
      this.classSize = 'pizza-details-content-image-small';
      this.pizzaRating = this.themeService.data.value.pizzaRating;
      console.log(this.themeService.data.value.pizzaRating);
      this.commentService.getComments(this.pizzaId).subscribe(data => this.comments = data);
      if (!this.themeService.data.value.ingredientsPizza.length){
        this.ingredientService.getAllIngredients().subscribe(data => this.themeService.data.value.ingredientsPizza = data);
      }
    }
  }

  onSmall(): void {
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.SMALL).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
        this.themeService.data.value.pizzaDescription = this.pizzaDescription;
        this.classSize = 'pizza-details-content-image-small';
      });
    }
  }

  onMedium() {
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.MEDIUM).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
        this.themeService.data.value.pizzaDescription = this.pizzaDescription;
        this.classSize = 'pizza-details-content-image-medium';
      });
    }
  }

  onLarge() {
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.LARGE).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
        this.themeService.data.value.pizzaDescription = this.pizzaDescription;
        this.classSize = 'pizza-details-content-image-large';
      });
    }
  }

  onAddClick(name: string, price: number): void {
    const strings = this.themeService.data.value.pizzaDescription.split(',');
    if (strings.includes(`${name}`)) {
      const findIndex = strings.findIndex(value => value === name);
      strings.splice(findIndex, 1);
      this.themeService.data.value.pizzaDescription = strings.join(',');
      this.themeService.data.value.pizzaPrice = this.themeService.data.value.pizzaPrice - price;
    } else if (!strings.includes(`${name}`)) {
      strings.push(name);
      this.themeService.data.value.pizzaPrice = this.themeService.data.value.pizzaPrice + price;
      this.themeService.data.value.pizzaDescription = strings.join(',');
    }
  }

  onPayment(): void{
    this.isOpenPayment = !this.isOpenPayment;
  }

  onComments(): void{
    this.isOpenComments = !this.isOpenComments;
  }
  getAverageRating(): number{
    if (this.pizzaRating.length){
      this.averageRating = this.pizzaRating.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0);
      return this.averageRating = Math.round(this.averageRating / this.pizzaRating.length);
    }
  }
}
