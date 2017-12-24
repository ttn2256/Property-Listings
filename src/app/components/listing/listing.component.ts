import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Listing } from '../../services/firebase.model';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id: any;
  listing: any;
  path: any;
  imageUrl: any;
  proplisting:Listing[];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //Get ID

    this.id = this.route.snapshot.params['id'];
    var u = this.firebaseService.getListingDetails(this.id);
    u.snapshotChanges().subscribe(listing => {
      this.listing = listing.payload.val();


      var path = this.listing.path;
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(path);
      storageRef.child(path).getDownloadURL().then((url) => {
        this.imageUrl = url;
      });

    });
  }

  onDeleteClick(){
    this.firebaseService.deleteListing(this.id);
    this.router.navigate(['listings']);
  }

}
