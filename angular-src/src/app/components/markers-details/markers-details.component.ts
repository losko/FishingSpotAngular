import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MarkerService } from '../../services/marker.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-markers-details',
  templateUrl: './markers-details.component.html',
  styleUrls: ['./markers-details.component.css']
})
export class MarkersDetailsComponent implements OnInit {
  user: any;
  isAuthor: boolean;
  isAdmin: boolean;
  id: string;
  img: string;
  name: string;
  markerInfo: string;
  constructor(
    private authService: AuthService,
    private markerService: MarkerService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'].substring(1);
    });
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.isAdmin = false;
      this.isAuthor = false;
    }
    this.markerService.getMarkerById(this.id).subscribe(data => {
      this.img = data.markerDetails.imgUrl;
      this.name = data.markerDetails.name;
      this.markerInfo = data.markerDetails.detailsInfo;
      if (localStorage.getItem('user')) {
        if (this.user.id === data.markerDetails.marker.author) {
          this.isAuthor = true;
        }
        if (this.user.isAdmin) {
          this.isAdmin = true;
        }
      }
    });
  }

  onDetailsSubmit() {
    const details = {
      id: this.id,
      img: this.img,
      name: this.name,
      markerInfo: this.markerInfo
    };
    this.markerService.updateMarkerDetails(details.id, details).subscribe(data => {
      this.img = data.markerDetails.imgUrl;
      this.name = data.markerDetails.name;
      this.markerInfo = data.markerDetails.detailsInfo;
    });
  }

}
