import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service"
import { AuthService } from "../../services/auth.service"
import { FlashMessagesService } from "angular2-flash-messages"
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill aLl required fields', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    // Required Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use a valid Email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('Register Success', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Register Error', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
