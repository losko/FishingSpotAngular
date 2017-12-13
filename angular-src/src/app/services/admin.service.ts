import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthService} from './auth.service';

@Injectable()
export class AdminService {
  user: any;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}
  // Clear functions for markers
  getAll() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/admin/getAllMarkers', {headers: headers})
      .map(res => res.json());
  }

  getAllPublic() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/admin/getAllPublicMarkers', {headers: headers})
      .map(res => res.json());
  }

  getAllPrivate() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/admin/getAllPrivateMarkers', {headers: headers})
      .map(res => res.json());
  }

  // User functions for markers
  /*getUserAll(userId) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/markers/getAll/' + userId, {headers: headers})
      .map(res => res.json());
  }*/
  // Update marker
  updateMarkerName(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/updateMarkerName/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerInfo(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/updateMarkerInfo/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerPosition(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/updateMarkerPosition/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerPrivacy(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/updateMarkerPrivacy/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerDraggable(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/updateMarkerDraggable/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  deleteMarker(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/deleteMarker/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }
  // User Funtions
  // Get All Users
  getAllUsers() {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get('http://localhost:3000/admin/getAllUsers', {headers: headers})
        .map(res => res.json());
    }
  }
  // Get User By Id
  getUserById(userId) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get('http://localhost:3000/admin/getUserById/:?id=' + userId, {headers: headers})
        .map(res => res.json());
    }
  }
  // Delete User
  deleteUser(userId, user) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/deleteUser/' + userId, user, {headers: headers})
        .map(res => res.json());
    }
  }
  // Make User Admin
  makeAdmin(userId, user) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/makeAdmin/' + userId, user, {headers: headers})
        .map(res => res.json());
    }
  }
  // Make User Normal
  makeNormal(userId, user) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/makeNormal/' + userId, user, {headers: headers})
        .map(res => res.json());
    }
  }
  editUser(userId, user) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/admin/editUser/' + userId, user, {headers: headers})
        .map(res => res.json());
    }
  }
}
