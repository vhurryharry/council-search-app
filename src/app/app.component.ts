import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'council-search-app';
  displayBetaSignUp: boolean;
  isProd = environment.production;

  constructor(public router: Router) {
    // Sign up
    let dateBetaClosedStr = localStorage.getItem("dateBetaClosed");

    // Theres a date in there
    if(dateBetaClosedStr != null && dateBetaClosedStr != undefined){
      let dateBetaClosed = new Date(dateBetaClosedStr);
      let weekAgo = new Date(); // Today
      weekAgo.setDate(weekAgo.getDate() - 7); // one week ago

      if(dateBetaClosed.getTime() < weekAgo.getTime()){
        this.displayBetaSignUp = true;
      }else{
        this.displayBetaSignUp = false;
      }

    // If they've never closed it
    }else{
      this.displayBetaSignUp = true;
    }

    if(this.isProd){
      // Google analytics
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd){
          gtag('config', 'UA-167455761-1',{
              'page_path': event.urlAfterRedirects
          });
        }
      })

    }else{
      console.log("Google analytics is off");
    }

  }


  closeBetaDisplay(){
    // Close dialog
    this.displayBetaSignUp = false;
    // Set the date locally
    let now = new Date();
    localStorage.setItem("dateBetaClosed", now.toString());
  }

}
