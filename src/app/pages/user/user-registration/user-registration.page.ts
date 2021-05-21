import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Params, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {UserService} from '../../../services/userDao/user.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.page.html',
  styleUrls: ['./user-registration.page.scss'],
})
export class UserRegistrationPage implements OnInit {
  @Input()
  user: User;
  hide = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  login: FormControl;
  name: FormControl;
  lastName: FormControl;
  password: FormControl;
  confirmPassword: FormControl = new FormControl('', [Validators.minLength(10),
    Validators.maxLength(30), Validators.required]);
  email: FormControl;
  city: FormControl;
  address: FormControl;
  phone: FormControl;
  postCode: FormControl;
  private message: Params;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private navCtr: NavController,
              public themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      login: this.login = new FormControl(this.user ? `${this.user.username}` : '',
        [Validators.maxLength(30), Validators.required]),
      password: this.password = new FormControl('',
        [Validators.minLength(10), Validators.maxLength(30), Validators.required]),
      confirmPassword: this.confirmPassword
    }, [this.passwordValidator.bind(this.firstFormGroup), this.passwordLengthValidator.bind(this)]);
    this.secondFormGroup = new FormGroup({
      name: this.name = new FormControl(this.user ? this.user.name : '',
        [Validators.maxLength(30), Validators.required]),
      lastName: this.lastName = new FormControl(this.user ? this.user.lastName : '',
        [Validators.maxLength(30), Validators.required]),
      email: this.email = new FormControl(this.user ? this.user.email : '',
        [Validators.email, Validators.required]),
      city: this.city = new FormControl(this.user ? this.user.city : '', Validators.required),
      address: this.address = new FormControl(this.user ? this.user.address : '', Validators.required),
      postCode: this.postCode = new FormControl(this.user ? this.user.postCode : '', Validators.required),
      phone: this.phone = new FormControl(this.user ? this.user.phone : '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    }, [this.phoneValidator.bind(this), this.emailValidator.bind(this)]);
  }

  passwordValidator(form: FormGroup): null | object {
    const {value: password} = form.controls.password;
    const {value: confirmPassword} = form.controls.confirmPassword;
    return password === confirmPassword ? null : {passwordError: true};
  }
  passwordLengthValidator(form: FormGroup): null | object{
    const {value: password} = form.controls.password;
    if (password && password.length < 10){
      return {passwordLengthError: true};
    }
    else {
      return null;
    }
  }
  phoneValidator(form: FormGroup): null | object {
    const {value: phone} = form.controls.phone;
    const regexp = /[A-Z]/gi;
    const matches = phone.match(regexp);
    console.log(matches);
    if (matches && matches.length) {
      return {phoneError: true};
    } else {
      return null;
    }
  }
  emailValidator(form: FormGroup): null | object{
    const {value: email} = form.controls.email;
    const regExpMatchArray = email.match(/['.']/g);
    console.log(regExpMatchArray);
    if (regExpMatchArray && regExpMatchArray.length){
      return null;
    }
    else {
      return {emailError: true};
    }
  }
  onSave(firstFormGroup: FormGroup, secondFormGroup: FormGroup): void {
    console.log(firstFormGroup.controls, secondFormGroup.controls);
    const user = {
      username: (`${firstFormGroup.controls.login.value}`).trim().toLowerCase(),
      password: `${firstFormGroup.controls.password.value}`.trim(),
      name: `${secondFormGroup.controls.name.value}`.trim(),
      lastName: `${secondFormGroup.controls.lastName.value}`.trim(),
      city: `${secondFormGroup.controls.city.value}`.trim().toLowerCase(),
      address: `${secondFormGroup.controls.address.value}`.trim().toLowerCase(),
      postCode: `${secondFormGroup.controls.postCode.value}`.trim(),
      phone: `${secondFormGroup.controls.phone.value}`.trim(),
      email: `${secondFormGroup.controls.email.value}`.trim().toLowerCase(),
      role: 'ROLE_USER'
    };
    console.log(user);
    this.firstFormGroup.disable();
    this.secondFormGroup.disable();
    this.userService.saveUser(user).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.router.navigate(['']).then(data => console.log(data));
    }, error => {
      this.firstFormGroup.enable();
      this.secondFormGroup.enable();
    });
  }

  onUpdate(firstFormGroup: FormGroup, secondFormGroup: FormGroup): void{
    const user = {
      username: (`${firstFormGroup.controls.login.value}`).trim().toLowerCase(),
      password: `${firstFormGroup.controls.password.value}`.trim(),
      name: `${secondFormGroup.controls.name.value}`.trim(),
      lastName: `${secondFormGroup.controls.lastName.value}`.trim(),
      city: `${secondFormGroup.controls.city.value}`.trim().toLowerCase(),
      address: `${secondFormGroup.controls.address.value}`.trim().toLowerCase(),
      postCode: `${secondFormGroup.controls.postCode.value}`.trim(),
      phone: `${secondFormGroup.controls.phone.value}`.trim(),
      email: `${secondFormGroup.controls.email.value}`.trim().toLowerCase(),
      // role: 'ROLE_USER'
    };
    this.firstFormGroup.disable();
    this.secondFormGroup.disable();
    this.userService.updateUser(+this.user.id, user).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.router.navigate(['']).then(data => console.log(data));
    }, error => {
      this.firstFormGroup.enable();
      this.secondFormGroup.enable();
    });
  }

  selectChange($event: number) {
    console.log($event);
  }
}
