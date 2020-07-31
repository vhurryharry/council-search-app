import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Council Search
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { BetasignupComponent } from './betasignup/betasignup.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'beta', component: BetasignupComponent },
  { path: 'search', component: SearchComponent },
  { path: 'document/:uuid', component: DocumentComponent },
  { path: ':docType/:state/:geo/:type/:year/:month/:day', component: DocumentComponent },
  { path: 'thankyou', component: ThankyouComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
