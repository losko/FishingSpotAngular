import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  id: string;
  currenUsername: string;
  currentName: string;
  currentEmail: string;
  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'].substring(1);
    });
    this.adminService.getUserById(this.id).subscribe(user => {
      this.currenUsername = user.user.username;
      this.currentName = user.user.name;
      this.currentEmail = user.user.email;
    });
  }

  onEditSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      id: this.id
    };
    // Register User
    this.adminService.editUser(this.id, user).subscribe(editedUser => {
      this.flashMessagesService.show(editedUser.msg, {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/users']);
    });
  }
}

