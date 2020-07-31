export class Result {
  public id: number;
  public state: string;
  public regionId: number;
  public regionName: string;
  public regionType: string;
  public title: string;
  public uuid: string;
  public docType: string;
  public meetingDate: Date;
  public text: string;
  public upcoming: boolean;

  constructor(jsonObj) {
    this.id = jsonObj.id;
    this.state = jsonObj.state;
    this.regionId = jsonObj.regionId;
    this.regionName = jsonObj.regionName;
    this.regionType = jsonObj.regionType;
    this.title = jsonObj.title;
    this.uuid = jsonObj.uuid;
    this.docType = jsonObj.documentType;
    this.text = jsonObj.text;
    this.meetingDate = new Date(jsonObj.meetingDate);
    let now = new Date();

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    if (this.meetingDate >= now) {
      this.upcoming = true;
    }else{
      this.upcoming = false;
    }
  }
}
