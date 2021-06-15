import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Avatar} from '../../../models/Avatar';
import {Voice} from '../../../models/Voice';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {CommentService} from '../../../services/commentDao/comment.service';
import {VoiceService} from '../../../services/voiceDao/voice.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {Comment} from '../../../models/Comment';
import {AvatarService} from '../../../services/avatarDao/avatar.service';
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';
import {APiURL} from '../../../config/configURL';

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
  commentId: EventEmitter<number> = new EventEmitter<number>();
  avatars: Avatar[];
  findAvatar: string;
  isEditComment: boolean;
  voice: Voice;
  isLiked: boolean;
  voiceSum: number;
  error: string;
  avatarUrl = APiURL.avatarImage;
  @Output()
  likedComment: EventEmitter<Comment> = new EventEmitter();
  @Output()
  likeId: EventEmitter<object> = new EventEmitter();

  constructor(private pizzaService: PizzaService,
              private avatarService: AvatarService,
              public themeService: ThemeService,
              private toaster: ToasterServiceService,
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
    this.commentService.deleteComment(id).subscribe(data => {
        this.commentId.emit(id);
        this.themeService.data.value.message = 'Your comment was deleted';
        this.toaster.presentToast();
    }, error => this.error = error);
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
      this.themeService.data.value.message = 'Thank you for your vote';
      this.toaster.presentToast();
      this.comment.voice = [...this.comment.voice, data];
      this.likedComment.emit(this.comment);
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
    user && user.userId !== 0 ? this.isLiked = true : this.isLiked = false;
  }

  onDeleteVoice(id: number): void {
    const voice = this.comment.voice.find(value => {
      return value.userId === this.themeObjectService.data.value.userId;
    });
    if (voice && this.isLiked) {
      this.voiceService.deleteVoiceComment(voice.id).subscribe(data => {
        this.voiceSum -= 1;
        this.isLiked = false;
        this.themeService.data.value.message = `you deleted your like comment from  ${this.comment.author}`;
        this.toaster.presentToast();
        this.likeId.emit({commentId: this.comment.id, voiceId: id});
      });
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
