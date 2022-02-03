import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { singupService } from './signup.service';
import { UserNotTakenValidator } from './user-not-taken.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidator]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTaken: UserNotTakenValidator,
    private signupService: singupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
        this.userNotTaken.checkUserNameTaken(),
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.singup(newUser)
      .subscribe(() => 
        this.router.navigate(['']),
        err => console.log(err)
      )
  }
}
