import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/component/alert/alert.service';
import { NewPhoto } from '../photo/newPhoto';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  photoForm!: FormGroup;
  file!: File;
  preview!: string;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      allowComments: [true],
    });
  }

  upload(): void {
    const dados = this.photoForm.getRawValue() as NewPhoto;
    dados.file = this.file;

    this.photoService.upload(dados).subscribe(() => {
      this.alertService.sucess('Upload Complete');
      this.router.navigate(['']);
    });
  }

  getFile(event: any) {
    this.file = event?.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(this.file);
  }
}
