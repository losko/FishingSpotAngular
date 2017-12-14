import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class MarkerService {
  user: any;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  createMarker(marker) {
    if (this.authService.loggedIn()) {
      const user = JSON.parse(localStorage.getItem('user'));
      marker.user = user.id;
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/create', marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }
  // Clear functions for markers
  getAll() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/markers/getAll', {headers: headers})
      .map(res => res.json());
  }

  getAllPublic() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/markers/getAllPublic', {headers: headers})
      .map(res => res.json());
  }

  getAllPrivate() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/markers/getAllPrivate', {headers: headers})
      .map(res => res.json());
  }

  // User functions for markers
  getUserAll(userId) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/markers/getAll/' + userId, {headers: headers})
      .map(res => res.json());
  }

  // Update marker
  updateMarkerName(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/updateName/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerInfo(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/updateInfo/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerPosition(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/updatePosition/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerPrivacy(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/updatePrivacy/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  updateMarkerDraggable(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/updateDraggable/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }

  deleteMarker(markerId: any, marker: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/markers/delete/' + markerId, marker, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }
  // MARKER DETAILS FUNCTIONS
  // Get marker details by id
  getMarkerById(detailsId) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/markerDetails/getById/:?id=' + detailsId, {headers: headers})
      .map(res => res.json());
  }
  // Update marker By id
  updateMarkerDetails(markerId: any, markerDetails: any) {
    if (this.authService.loggedIn()) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/MarkerDetails/updateDetails/' + markerId, markerDetails, {headers: headers})
        .map(res => res.json());
    } else {
      console.log('not Logged In');
    }
  }
}
