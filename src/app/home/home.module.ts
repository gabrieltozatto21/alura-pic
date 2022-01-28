import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@Angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/component/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignInComponent],
  imports: [ReactiveFormsModule, CommonModule, VMessageModule, RouterModule],
})
export class HomeModule {}
