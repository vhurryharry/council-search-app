import {FormControl} from '@angular/forms';

export class Request {
  public q = new FormControl();
  public offset: number;
  public rows: number;
  public startDateStr: string;
  public endDateStr: string;
  public sort: string;
  public documentType = new Array<String>();
  public regionType = new Array<String>();
  public region = new Array<String>();
  public exactMatch: boolean;

  constructor() { }

}
