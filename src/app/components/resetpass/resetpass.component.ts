import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
  email: string;
  constructor(
    public afAuth: AngularFireAuth,
    private flashMessage: FlashMessagesService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  onReset(email:string) {
    this.afAuth.auth.sendPasswordResetEmail(this.email).then((response) => {
      this.flashMessage.show('Reset link has sent to your email',
      {cssClass: 'alert-success', timeout: 1000});
      setTimeout((router: Router) => {
       this.router.navigate(['']);
     }, 1000);
    }).catch((error)=> {
      this.flashMessage.show('You do not have an account with us, please register your account',
      {cssClass: 'alert-danger', timeout: 1000});

      setTimeout((router: Router) => {
       this.router.navigate(['/register']);
     }, 1000);

    });

  }

}
