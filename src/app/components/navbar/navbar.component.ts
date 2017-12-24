import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  name: any;
  image: any;
  email: any;

  constructor(
    public afAuth: AngularFireAuth,
    public flashMessage: FlashMessagesService,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => {
      if (auth == null) {
        this.router.navigate(['']);
      } else if (auth.displayName == null) {
        this.name = auth.email;
        this.image = null;
      } else {
        this.name = auth.displayName;
        this.image = auth.photoURL;
      }

    });

  }





  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);

  }

}
