import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css'],
})
export class PhotoCommentsComponent implements OnInit {
  @Input() id!: number;
  comments$!: Observable<PhotoComment[]>;
  commentForm!: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.id);
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  saveComment() {
    const commentText = this.commentForm.get('comment')?.value as string;
    this.comments$ = this.photoService
      .addComment(this.id, commentText)
      .pipe(
        switchMap(() => this.photoService.getComments(this.id)),
        tap(() => this.commentForm.reset())
      );
  }
}
