import { Component, OnInit } from '@angular/core';
import { Listing } from '../../services/firebase.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id:any;
  title: any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  image:any;
  type:any;
  listing: any;
  imageUrl:any;
  latitude: any;
  longitude: any;
  newlatitude: any;
  newlongitude: any;
  files : FileList;
  zoom: any;

  @ViewChild('address') public searchElement: ElementRef;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone

  ) {

    this.zoom = 12;
    this.id = this.route.snapshot.params['id'];
    var x = this.id;
    this.firebaseService.getListingDetails(x).snapshotChanges().subscribe(listing => {
      this.listing = listing.payload.val();
      this.title = this.listing.title;
      this.owner = this.listing.owner;
      this.city = this.listing.city;
      this.bedrooms = this.listing.bedrooms;
      this.price = this.listing.price;
      this.type = this.listing.type;
      var path = this.listing.path;
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(path);
      storageRef.child(path).getDownloadURL().then((url) => {
        this.imageUrl = url;
      });

      this.latitude = this.listing.lat;
      this.longitude = this.listing.long;
      console.log(this.latitude, this.longitude);

    });


  }


  ngOnInit() {

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
           this.zoom =12;
          });


          });
    });


  }


  onEditSubmit(){
    let listing = {
      title: this.title,
      city: this.searchElement.nativeElement.value,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type,
      lat: this.latitude,
      long: this.longitude
    }

    this.firebaseService.updateListing(this.id, listing);
    this.router.navigate(['listings']);
  }

}
