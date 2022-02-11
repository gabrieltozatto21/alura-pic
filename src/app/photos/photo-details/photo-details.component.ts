import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/component/alert/alert.service';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
})
export class PhotoDetailsComponent implements OnInit {
  photo$!: Observable<Photo>;
  photoId!: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['idPhoto'];
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(()=>{}, err => {
        this.router.navigate(['not-found'])
    })
  }

  remove() {
    this.photoService.removePhoto(this.photoId).subscribe(() => {
      this.alertService.sucess('Photo removed');
      this.router.navigate(['/user', this.userService.getUserName()]);
    });
  }

  like(photo: Photo){
    this.photoService
      .like(photo.id ?? 0)
      .subscribe(liked => {
        if(liked) this.photo$ = this.photoService.findById(photo.id ?? 0); 
      })
  }
}
