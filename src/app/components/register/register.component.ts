import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Observable<firebase.User>;
  email: string;
  password: string;

  constructor(
    public afAuth: AngularFireAuth,
    private flashMessage: FlashMessagesService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  onSubmitRegister(email:string, password:string) {
    this.afAuth.auth.fetchProvidersForEmail(this.email).then(providers => {
      if (providers.length === 0) {
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);

        this.flashMessage.show('Account has been created',
        {cssClass: 'alert-success', timeout: 1000});
        setTimeout((router: Router) => {
         this.router.navigate(['/listings']);
       }, 1000);

      } else {
        this.flashMessage.show('Email already exists',
        {cssClass: 'alert-danger', timeout: 1000});
      }
    });

  }

}
