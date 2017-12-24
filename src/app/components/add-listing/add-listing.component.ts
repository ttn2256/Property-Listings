import { Component, OnInit } from '@angular/core';
import { Listing } from '../../services/firebase.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})


export class AddListingComponent implements OnInit {

  title:any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  type:any;
  image:any;
  search:any;
  email:any;
  name:any;
  latitude: any;
  longitude: any;
  zoom: any;

  @ViewChild('address') public searchElement: ElementRef;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
  }


  ngOnInit() {

    this.afAuth.authState.subscribe((auth) => {
        if (auth == null){
          this.router.navigate(['']);
        }
        else if (auth.displayName == null) {
          this.name = auth.email;
        } else {
          this.name = auth.displayName;
        }
    });


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
           if(place.geometry === undefined || place.geometry === null ){
            return;
           }
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.zoom = 12;

        });
      });
    });
  }

  onAddSubmit(){
    let listing = {
      title: this.title,
      city: this.searchElement.nativeElement.value,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type,
      name: this.name,
      lat: this.latitude,
      long: this.longitude
    }

    this.firebaseService.addListing(listing);
    this.router.navigate(['listings']);

  }
}
