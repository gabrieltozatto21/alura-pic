import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@Angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/component/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { singupService } from './signup/signup.service';

@NgModule({
  declarations: [SignInComponent, SignupComponent, HomeComponent],
  imports: [ReactiveFormsModule, CommonModule, VMessageModule, RouterModule, HomeRoutingModule],
  providers: [ singupService ]
})
export class HomeModule {}
