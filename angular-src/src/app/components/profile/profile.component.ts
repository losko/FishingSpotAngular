import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MarkerService } from '../../services/marker.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: Object;
  // Zoom level
  public zoom;
  // Start Position
  public lat: number;
  public lng: number;
  // Markers
  public markers: marker[];
  public error: Object;

  constructor(
    private authService: AuthService,
    private markerService: MarkerService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.lat = 42.724418;
    this.lng = 25.152100;
    this.zoom = 2;
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user[0];
        this.getLocation();
        this.markers = profile.user[0].markers;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 7;
      });
    } else {
      this.error = {
        msg: 'Geolocation is not supported by this browser'
      };
    }
  }

  getDetails(detailsId) {
    this.router.navigate(['/markerDetails/:' + detailsId]);
  }

  clickedMarker(marker: marker, index: number) {
    console.log('Clicked Marker: ' + marker.name + ' At index ' + index);
  }

  mapClicked($event: any) {
    const newMaker = {
      name: 'Click to enter a name',
      info: 'Click to enter info',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      editName: false,
      editInfo: false,
      privacy: true,
    };
    if (this.markerService.createMarker(newMaker)) {
      this.markerService.createMarker(newMaker).subscribe(data => {
        if (data.success) {
          const nMarker = data.user.markers[data.user.markers.length - 1];
          this.markers.push(nMarker);
        } else {
          throw Error;
        }
      });
    } else {
      this.flashMessagesService.show('Fail to create a marker', {cssClass: 'alert-danger', timeout: 3000});
    }
  }

  markerDragEnd(marker: any, $event: any) {
    marker.lat = $event.coords.lat;
    marker.lng = $event.coords.lng;
    this.markerService.updateMarkerPosition(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }

  editNameFunc(marker: any, $event: any) {
    marker.name = $event;
    this.markerService.updateMarkerName(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }

  editInfoFunc(marker: any, $event: any) {
    marker.info = $event;
    this.markerService.updateMarkerInfo(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }
  editPrivacy(marker: any, $event: any) {
    /*console.log($event)*/
    marker.privacy = $event;
    this.markerService.updateMarkerPrivacy(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }
  editDraggable(marker: any, $event: any) {
    marker.draggable = $event;
    if ($event == 'false') {
      marker.draggable = false;
    } else {
      marker.draggable = true;
    }
    this.markerService.updateMarkerDraggable(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }

  deleteMarker(marker) {
    this.markerService.deleteMarker(marker._id, marker).subscribe(data => {
        this.markers = data.markers;
    });
  }
}

// Marker Type
interface marker{
  name?: string;
  info?: string;
  lat: number;
  lng: number;
  draggable: boolean;
  editName: boolean;
  editInfo: boolean;
}
