import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs';
import { singupService } from './signup.service';

@Injectable()
export class UserNotTakenValidator {
  constructor(private signupService: singupService) {}

  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap((userName) => {
          return this.signupService.checkUserNameTaken(userName)
        }
        ),
        map((isTaken) => (isTaken ? { userNameTaken: true } : null)),
        first()
      );
    };
  }
}
