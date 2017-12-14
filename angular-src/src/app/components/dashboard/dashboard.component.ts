import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Zoom level
  public zoom = 2;
  // Start Position
  public lat: number;
  public lng: number;
  // Markers
  public markers: marker[];
  public error: Object;

  constructor(
    private adminService: AdminService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.adminService.getAll().subscribe(allMakrers => {
      this.markers = allMakrers.markers;
    });
  }

  getDetails(detailsId) {
    this.router.navigate(['/markerDetails/:' + detailsId]);
  }

  clickedMarker(marker: marker, index: number) {
    console.log('Clicked Marker: ' + marker.name + ' At index ' + index);
  }

  markerDragEnd(marker: any, $event: any) {
    marker.lat = $event.coords.lat;
    marker.lng = $event.coords.lng;
    this.adminService.updateMarkerPosition(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }

  editNameFunc(marker: any, $event: any) {
    marker.name = $event;
    this.adminService.updateMarkerName(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }

  editInfoFunc(marker: any, $event: any) {
    marker.info = $event;
    this.adminService.updateMarkerInfo(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }
  editPrivacy(marker: any, $event: any) {
    /*console.log($event)*/
    marker.privacy = $event;
    this.adminService.updateMarkerPrivacy(marker._id, marker).subscribe(data => {
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
    this.adminService.updateMarkerDraggable(marker._id, marker).subscribe(data => {
      /*console.log(data)*/
    });
  }

  deleteMarker(marker) {
    this.adminService.deleteMarker(marker._id, marker).subscribe(data => {
      this.markers = data.markers;
    });
  }

}

interface marker{
  name?: string;
  info?: string;
  lat: number;
  lng: number;
  draggable: boolean;
  editName: boolean;
  editInfo: boolean;
}
