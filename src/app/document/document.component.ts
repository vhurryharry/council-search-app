import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data.service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
  // ,
  // encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {
  isPageLoading = true; // TODO - make this a component
  baseUrl = environment.baseUrl;
  success: boolean;
  uuid: string;
  errorMsg: string;
  stateAbbr: string;
  regionName: string;
  monitorURL: string;
  dateCreated: Date;
  meetingDate: Date;
  lastModified: Date;
  title: string;
  url: string;
  content: string;
  documentType: string;

  constructor(private actRoute: ActivatedRoute, private data: DataService, private toastr: ToastrService) {
    // Grab it from the active route
    this.uuid = this.actRoute.snapshot.params.uuid;

    if(this.uuid == null){
      // grab it from hash
      this.actRoute.fragment.subscribe((fragment: string) => {
        this.uuid = fragment;
      })
    }

  }

  ngOnInit(): void {
    // Get the document data
    // Parse the results
    this.data.getDocument(this.uuid).subscribe(data => {
      if(data.uuid != null){
        this.uuid = data.uuid;
        this.stateAbbr = data.stateAbbr;
        this.regionName = data.regionName;
        this.monitorURL = data.monitorURL;
        this.dateCreated = new Date(data.dateCreated);
        this.meetingDate = new Date(data.meetingDate);
        this.lastModified = new Date(data.lastModified);
        this.title = data.title;
        this.url = data.url;
        this.content = data.content;
        this.documentType = data.documentType;
        this.success = true;
      }else{
        this.errorMsg = "Could not load document";
        this.success = false;
      }
      this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load document";
      this.isPageLoading = false;
      this.success = false;
    });
  }

  downloadPDF(){
    this.toastr.success("Preparing download...", "Document", { timeOut: 60000 });

    this.data.getPDF(this.uuid).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = this.uuid+".pdf";
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.toastr.success("Download Complete");
    },(error) => {
      this.toastr.error("Could not download document");
    })
  }

}
