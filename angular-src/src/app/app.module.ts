import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Http, Headers, HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { MarkerService } from './services/marker.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { AdminService } from './services/admin.service';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoggedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  {path: 'editUser/:id', component: EditUserComponent, canActivate: [AdminGuard]}
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
    FooterComponent,
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    LoggedGuard,
    MarkerService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
