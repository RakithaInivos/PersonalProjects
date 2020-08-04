import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';
import { PaperComponent } from './paper/paper.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: '', component: LandingComponent },
  { path: 'paperPage', component: PaperComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PaperComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
     FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers:[AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
