import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../../../models/Comment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PizzaService} from '../../../../services/pizzaDao/pizza.service';
import {CommentService} from '../../../../services/commentDao/comment.service';
import {ThemeService} from '../../../../../theme/behaviour-subject/theme.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  @Input() pizzaId;
  @Input() commentUser: Comment;
  @Output()  updatedComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() isOpenCommentEditor: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() comments: EventEmitter<Comment[]> = new EventEmitter<Comment[]>();
  @Output() isOpenForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  pizzaComment: Comment;
  comment: FormGroup;
  tittle: FormControl;
  body: FormControl = new FormControl('', [Validators.required]);
  error: string;
  constructor(private pizzaService: PizzaService,
              private commentService: CommentService,
              public themeService: ThemeService) { }

  ngOnInit(): void {
    this.comment = new FormGroup({
      tittle: this.tittle = new FormControl(this.commentUser ? this.commentUser.tittle : '', [Validators.required]),
      body: this.body = new FormControl(this.commentUser ? this.commentUser.body : '', [Validators.required])
    });
  }

  onSave(comment: FormGroup): void{
    this.pizzaComment = {
      tittle: comment.controls.tittle.value,
      body: comment.controls.body.value,
      voice: [],
    };
    this.commentService.saveComment(this.pizzaId, this.themeService.data.value.userId, this.pizzaComment)
      .subscribe(data => {
        this.comment.disable();
        this.comments.emit(data);
        this.isOpenForm.emit(false);
        this.comment.reset();
      }, error => {
        this.error = error;
        this.comment.enable();
      });
  }

  onUpdate(comment: FormGroup): void{
    this.pizzaComment = {
      author: this.commentUser.author,
      tittle: comment.controls.tittle.value,
      body: comment.controls.body.value,
      pizzaId: this.pizzaId,
      voice: this.commentUser.voice,
      date: this.commentUser.date,
      userId: this.themeService.data.value.userId,
    };
    this.commentService.editComment(this.commentUser.id, this.pizzaComment)
      .subscribe(data => {
        if (!!data){
          this.updatedComment.emit({...this.pizzaComment, upDated: data});
          this.isOpenCommentEditor.emit(!data);
        }
      }, error1 => this.error = error1);
 }

}
