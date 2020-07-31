import {Component, ViewEncapsulation} from '@angular/core';
import {Contact} from '../model/contact';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-betasignup',
  templateUrl: './betasignup.component.html',
  styleUrls: ['./betasignup.component.css']
  // ,
  // encapsulation: ViewEncapsulation.None
})
export class BetasignupComponent {

  contact = new Contact();
  errorMsg: string;

  constructor(private router: Router, private data: DataService) { }

  sendContact(){
    this.contact.type = "contact";

    this.data.postContact(this.contact).subscribe(data => {
      if (data == undefined) {
        this.errorMsg = data['Error'];
      } else {
        console.log(data);
      }
    })

    this.router.navigate(['/thankyou']);
  }

}
