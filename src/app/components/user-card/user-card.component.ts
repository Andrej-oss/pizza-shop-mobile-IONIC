import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {ThemeService} from '../../../theme/behaviour-subject/theme.service';
import {UserService} from '../../services/userDao/user.service';
import {AvatarService} from '../../services/avatarDao/avatar.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  user: User;
  avatarUrl = 'http://localhost:8080/avatar/image/';
  isAvatarOpen: boolean;
  image: File;
  userFormData: FormData = new FormData();

  constructor(public themeService: ThemeService,
              private avatarService: AvatarService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.themeService.data.value.principle;
    this.isAvatarOpen = false;
  }

  onOpenAvatarChange(): void {
    debugger;
    this.isAvatarOpen = !this.isAvatarOpen;
  }

  uploadFile($event: Event): void {
    this.image = ($event.target as HTMLInputElement).files[0];
  }

  onSaveAvatar(id: number): void{
    this.avatarService
      .saveAvatar(id, this.userFormData, this.userFormData.append('file', this.image))
      .subscribe(data => console.log(data));
    this.resetDataForm();
  }

  resetDataForm(): void{
    this.userFormData.delete('file');
    this.isAvatarOpen = false;
  }
}
