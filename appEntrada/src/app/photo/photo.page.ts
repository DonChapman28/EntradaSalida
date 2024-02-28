import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../photoService/photo-service.service';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  constructor(public photoService: PhotoServiceService) { }

  ngOnInit() {
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}



