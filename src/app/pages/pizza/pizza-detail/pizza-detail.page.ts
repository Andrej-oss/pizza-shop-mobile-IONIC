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
import {Cart} from '../../../models/Cart';
import {CartService} from '../../../services/cartDao/cart.service';
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';
import {Pizza} from '../../../models/Pizza';
import {UserService} from '../../../services/userDao/user.service';
import {APiURL} from '../../../config/configURL';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {Ingredient} from '../../../models/Ingredient';
import {Voice} from '../../../models/Voice';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.page.html',
  styleUrls: ['./pizza-detail.page.scss'],
})
export class PizzaDetailPage implements OnInit {
  pizzaId: number;
  sizeUrl = APiURL.pizzaSizeImage;
  sizePizza: Size;
  pizzaDescription: string;
  cart: Cart;
  classSize: string;
  isOpenPayment: boolean;
  comments: Comment[];
  isOpenComments: boolean;
  pizzaRating: Rating[];
  averageRating: number;
  isOpenCommentForm: boolean;
  ingredients: Ingredient[];
  pizza: Pizza;
  @Input()
  voiceComment: Voice;
  constructor(private sizeService: SizeService,
              private cartService: CartService,
              private pizzaService: PizzaService,
              private ingredientService: IngredientService,
              private toaster: ToasterServiceService,
              private userService: UserService,
              public themeService: ThemeService,
              private ratingService: RatingService,
              private commentService: CommentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => this.pizzaId = data.id);
    this.isOpenPayment = false;
    this.isOpenComments = false;
    if (this.themeService.data.value.pizza !== null && this.themeService.data.value.ingredientsPizza.length){
      this.pizza = this.themeService.data.value.pizza;
      let array = [];
      array = this.pizza.ingredients.split(',');
      this.themeService.data.value.ingredients = array;
      this.pizzaDescription = this.themeService.data.value.pizza.description;
    }
    if (!this.themeService.data.value.pizza && this.pizzaId ){
      this.pizzaService.getPizza(this.pizzaId).subscribe(pizza => {
        this.themeService.data.value.pizza = pizza;
        this.pizza = pizza;
        this.pizzaDescription = this.pizza.description;
      });
    }
    if (this.pizzaId !== 0 ) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.SMALL).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
      });
      // this.pizzaDescription = this.sizePizza.description;
      this.classSize = 'pizza-details-content-image-small';
      this.pizzaRating = this.themeService.data.value.pizzaRating;
      this.commentService.getComments(this.pizzaId).subscribe(data => this.comments = data);
    }
    if (!this.themeService.data.value.ingredientsPizza.length){
      let array = [];
      this.ingredientService.getAllIngredients().subscribe(data => {
        this.themeService.data.value.ingredientsPizza = data;
        array = this.pizza.ingredients.split(',');
        this.themeService.data.value.ingredients = array;
      });
    }
  }

  onSmall(): void {
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.SMALL).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
        this.pizza.description = this.pizzaDescription;
        this.classSize = 'pizza-details-content-image-small';
      });
    }
  }

  onMedium() {
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.MEDIUM).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
        this.pizza.description = this.pizzaDescription;
        this.classSize = 'pizza-details-content-image-medium';
      });
    }
  }

  onLarge() {
    if (this.pizzaId !== 0) {
      this.sizeService.getPizzaSize(this.pizzaId, SizePizza.LARGE).subscribe(data => {
        this.themeService.data.value.pizzaPrice = data.price;
        this.sizePizza = data;
        this.pizza.description = this.pizzaDescription;
        this.classSize = 'pizza-details-content-image-large';
      });
    }
  }

  onAddClick(name: string, price: number): void {
    const strings = this.pizza.description.split(',');
    if (strings.includes(`${name}`)) {
      const findIndex = strings.findIndex(value => value === name);
      strings.splice(findIndex, 1);
      this.pizza.description = strings.join(',');
      this.themeService.data.value.pizzaPrice = this.themeService.data.value.pizzaPrice - price;
    } else if (!strings.includes(`${name}`)) {
      strings.push(name);
      this.themeService.data.value.pizzaPrice = this.themeService.data.value.pizzaPrice + price;
      this.pizza.description = strings.join(',');
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

  onOpenCommentForm(): void{
    this.isOpenCommentForm = !this.isOpenCommentForm;
  }

  newComments(comments1: Comment[]) {
    this.comments = comments1;
  }

  isOpenCommentsForm($event: boolean) {
    this.isOpenCommentForm = $event;
  }

  deleteCommentById($event: number) {
    const index = this.comments.findIndex(value => value.id === $event);
    this.comments.splice(index, 1);
  }

  savePizzaInCart(id: number): void {
    this.cart = {
      description: this.pizza.description,
      pizzaId: id,
      amount: 1,
      price: this.themeService.data.value.pizzaPrice,
      volume: this.sizePizza.weight,
      userId: this.themeService.data.value.userId,
      size: this.sizePizza.size ? this.sizePizza.size : SizePizza.SMALL,
    };
    if (this.userService.isAuthenticated()) {
      this.cartService.savePizzaInCart(this.cart).subscribe(data => {
        this.themeService.data.value.message = 'Pizza added to cart';
        this.toaster.presentToast();
        this.themeService.data.value.cartElements += 1;
      });
    }else {
      this.themeService.data.value.message = 'Pizza added to cart';
      this.userService.saveCartInLocalStorage(this.cart);
    }
  }

  changeVoiceComment(comment: Comment): void{
    const index = this.comments.findIndex(value => comment.id === value.id);
    if (index){
      this.comments.splice(index, 1, comment);
    }
  }

  deleteVoiceComment(obj: object) {
    // @ts-ignore
    const comment = this.comments.find(value => value.id === obj.commentId);
    // @ts-ignore
    const index = comment.voice.findIndex(value => value.id === obj.voiceId);
    if (index) {
      comment.voice.splice(index, 1);
    }
  }

  ratedPizza(rating: Rating): void{
  //   console.log(this.pizza);
  //   this.pizza.rating = [...this.pizza.rating, rating];
  //   console.log(this.pizza);
  }
}
