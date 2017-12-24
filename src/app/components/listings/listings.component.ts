import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Listing } from '../../services/firebase.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as $ from 'jquery';

import { MapsAPILoader, LatLngBounds, LatLng } from '@agm/core';
import {} from '@types/googlemaps';




@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})


export class ListingsComponent implements OnInit {
  proplistings: Listing[];
  listings: any;
  name: any;
  image: any;
  email:any;
  imageUrl: any;
  lat: any;
  long: any;
  isMapVisible = true;
  page: number = 1;
  token = false;
  listing: any;
  bounds : any;

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone

  ) {

  }

  ngOnInit() {

    this.afAuth.authState.subscribe((auth) => {
        if (auth == null){
          this.router.navigate(['']);
        }

        else if (auth.displayName == null) {

          this.name = auth.email;
          this.displayListings(this.name);


        } else {
          
          this.name = auth.displayName;
          this.image = auth.photoURL;
          this.displayListings(this.name);

        }
    });

    $(document).ready(function() {

      $(window).bind("beforeunload", function(){
        localStorage.removeItem("mySmallTokenState");
      });

      $('#page').click(function(event){
        event.preventDefault();
        if(localStorage.getItem('mySmallTokenState') == "close"){
          $(".list-group").show();
          $(".pagination").show();
          $(".list-group-item-text").show();
          $('#products .item').removeClass('grid-group-item');
          $('#products .item').addClass('list-group-item');
        }

      });

      $('#list').click(function(event){
        event.preventDefault();
        $(".list-group").show();
        $(".pagination").show();
        $(".list-group-item-text").show();
        $('#products .item').removeClass('grid-group-item');
        $('#products .item').addClass('list-group-item');
        localStorage.setItem("mySmallTokenState", "close");
      });

      $('#grid').click(function(event){
        event.preventDefault();
        $(".list-group").show();
        $(".pagination").show();
        $(".list-group-item-text").hide();
        $('#products .item').removeClass('list-group-item');
        $('#products .item').addClass('grid-group-item');
        localStorage.setItem("mySmallTokenState", "open");
      });

      $('#btnmap').click(function(event){
        event.preventDefault();
        $(".list-group").hide();
        $(".pagination").hide();

      });

    });
  }



  mouseOver(infoWindow, gm) {

    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  displayListings(name){

    var x = this.firebaseService.getListings(name);
    x.snapshotChanges().subscribe(listings =>{
      this.proplistings=[];
      listings.forEach(element =>{

        var y = element.payload.toJSON();
        y["$key"] = element.key;

        var path = y["path"];
        var lat = parseFloat(y["lat"]);
        var long = parseFloat(y["long"]);

        // this.mapsAPILoader.load().then(() => {
        //     this.bounds = new google.maps.LatLngBounds();
        //     this.bounds.extend(new google.maps.LatLng(lat, long));
        //     console.log(this.bounds);
        // });

        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(path);
        storageRef.child(path).getDownloadURL().then((url) => {
          y["path"] = url;
          this.proplistings.push(y as Listing);
          return this.proplistings;

        });

      });


      // if (listings.length === 0){
      //   this.router.navigate(['add-listing']);
      // }

    });


  }


}
