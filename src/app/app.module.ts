import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AgmCoreModule } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxPaginationModule } from 'ngx-pagination';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './services/firebase.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';


const appRoutes: Routes =[
  {path: '', component:HomeComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'resetpass', component: ResetpassComponent},
  {path: 'edit-listing/:id', component: EditListingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    RegisterComponent,
    ResetpassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    InfiniteScrollModule,
    AgmJsMarkerClustererModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAh-xWK60cZDAjqhKj7l3auD9rtasivMDc',
      libraries: ["places"]
    })

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
