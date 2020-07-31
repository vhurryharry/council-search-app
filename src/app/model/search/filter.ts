export class Filter {
  public name: string;
  public count: number;
  public checked: boolean;

  constructor() { }

  toggle(){
    if(this.checked){
      this.checked = false;
    }else{
      this.checked = true;
    }
  }

}
