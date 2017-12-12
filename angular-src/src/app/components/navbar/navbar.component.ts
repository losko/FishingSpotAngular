import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isAdmin: boolean;
  username: string;
  constructor(
    public authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.username = user.username;
      this.isAdmin = user.isAdmin;
    }
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
