import { Component, OnInit } from '@angular/core';
import { MarkerService } from "../../services/marker.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Zoom level
  zoom: number = 7;

  // Start Position
  lat: number;
  lng: number;

  // Markers
  markers: marker[];
  error: Object;
  constructor(
    private markerService: MarkerService,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.getLocation();
    this.markerService.getAllPublic().subscribe(data => {
      this.markers = data.markers
    });
  }

  getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      this.error = {
        msg: 'Geolocation is not supported by this browser'
      }
    }
    return console.log('Loaded')
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
