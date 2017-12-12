import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {Http, Headers, HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { MarkerService } from "./services/marker.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/adminGuard"

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBuQfYHPGGX7udwgx01b__AZaZhnZC3X1I'
    })
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    AdminGuard,
    MarkerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
