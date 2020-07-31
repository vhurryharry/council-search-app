import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {Contact} from '../model/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
  // ,
  // encapsulation: ViewEncapsulation.None
})
export class ContactComponent {
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
