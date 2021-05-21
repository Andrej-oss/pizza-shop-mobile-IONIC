import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Avatar} from '../../../models/Avatar';
import {Voice} from '../../../models/Voice';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {CommentService} from '../../../services/commentDao/comment.service';
import {VoiceService} from '../../../services/voiceDao/voice.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {Comment} from '../../../models/Comment';
import {AvatarService} from '../../../services/avatarDao/avatar.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;
  @Input()
  pizzaId;
  @Output()
  comments: Comment[];
  avatars: Avatar[];
  findAvatar: string;
  isEditComment: boolean;
  voice: Voice;
  isLiked: boolean;
  voiceSum: number;
  voiceId: number;
  avatarUrl = 'http://localhost:8080/avatar/image/';

  constructor(private pizzaService: PizzaService,
              private avatarService: AvatarService,
              public themeService: ThemeService,
              private commentService: CommentService,
              private voiceService: VoiceService,
              public themeObjectService: ThemeService) {
  }

  ngOnInit(): void {
    this.voiceSummary();
    this.checkIsUserVoted();
    this.avatarService.getAllAvatars().subscribe(data => this.avatars = data);
  }

  onDeleteComment(id: number): void {
    this.isEditComment = false;
    this.commentService.deleteComment(id).subscribe(data => console.log(data));
    this.commentService.deleteComment(id).subscribe(data => this.comments);
    // this.themeObjectService.data.value.message = `your comment was deleted`;
  }

  onEdit(id: number): void {
    this.isEditComment = !this.isEditComment;
  }

  onLikeComment(id: number): void {
    this.voice = {
      voice: 1,
      userId: this.themeService.data.value.userId
    };
    this.voiceService.saveVoice(id, this.voice).subscribe(data => {
      console.log(data);
    });
    this.isLiked = true;
    this.voiceSum += 1;
    // this.themeObjectService.data.value.message = `you liked comment from  ${this.comment.author}`;
  }

  voiceSummary(): void {

    this.voiceSum = this.comment.voice.reduce((previousValue, currentValue) => previousValue + currentValue.voice, 0);
  }

  checkIsUserVoted(): void {
    const user = this.comment.voice.find(value => value.userId === this.themeObjectService.data.value.userId);
    console.log(user);
    user && user.userId !== 0 ? this.isLiked = true : this.isLiked = false;
  }

  onDeleteVoice(id: number): void {
    debugger;
    const voice = this.comment.voice.find(value => {
      return value.userId === this.themeObjectService.data.value.userId;
    });
    if (voice) {
      this.voiceService.deleteVoiceComment(voice.id).subscribe(data => console.log(data));
      this.voiceSum -= 1;
      this.isLiked = false;
      // this.themeService.data.value.message = `you deleted your like comment from  ${this.comment.author}`;
    }
  }
  findUsersAvatar(avatar: string): object{
    if (!!this.avatars && this.avatars.length) {
      const find = this.avatars.find(value => value.path === avatar);
      if (!!find) {
        this.findAvatar = find.path;
        return find;
      } else {
        return null;
      }
    }
  }

  onEditComment(comment1: Comment) {
    this.comment = comment1;
  }

  onCloseEditComment($event: boolean) {
    this.isEditComment = $event;
  }
}
