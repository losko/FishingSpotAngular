import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Object[];
  constructor(
    private adminService: AdminService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  // Get all users
  ngOnInit() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users.users;
    });
  }
  // Edit user
  editUser(userId) {
    this.router.navigate(['/editUser/:' + userId]);
  }
  // Change admin status
  makeAdmin(userId, user, i) {
    this.adminService.makeAdmin(userId, user).subscribe(res => {
      this.users[i] = res.user;
    });
  }
  makeNormal(userId, user, i) {
    this.adminService.makeNormal(userId, user).subscribe(res => {
      this.users[i] = res.user;
    });
  }
  // Delete user
  deleteUser(userId, user, i) {
    this.adminService.deleteUser(userId, user).subscribe(res => {
      if (res.success) {
        this.users.splice(i, 1);
        this.flashMessages.show(res.msg, {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }
}
