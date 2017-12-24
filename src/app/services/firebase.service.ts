import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Listing } from './firebase.model';
import * as firebase from 'firebase';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";


@Injectable()
export class FirebaseService {

  listings: AngularFireList<Listing[]>;
  listing: AngularFireObject<any>;
  folder: any;
  proplistings: any;
  private postIncrementListing: Subject<number>;
  readonly postBatchSize = 6;
  numPosts: number;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.folder = 'listingimages';


  }

  getListings(name){
    this.listings = this.db.list('listings',
    ref => ref.orderByChild('name').equalTo(name));
    return this.listings;
  }



  getListingDetails(id){
    this.listing = this.db.object('listings/'+id);
    return this.listing;
  }

  addListing(listing){
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]])
    {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);

      });
    }
  }

  updateListing(id, listing){
    if ((<HTMLInputElement>document.getElementById('image')).files.length >0) {
      let storageRef = firebase.storage().ref();
        for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]])
        {
          let path = `/${this.folder}/${selectedFile.name}`;
          let iRef = storageRef.child(path);
          iRef.put(selectedFile).then((snapshot) => {
            listing.image = selectedFile.name;
            listing.path = path;
            return this.listings.update(id,listing);
          });
      }
    } else {
      return this.listings.update(id,listing);
    }
  }

  deleteListing(id){
    return this.listings.remove(id);
  }


}
