import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../model/search/suggestion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private REST_API_SERVER = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getSuggestions(word, count): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>(this.REST_API_SERVER+'/guest/suggest/'+ word +'/'+count);
  }

  public getSearchResults(postData): Observable<any> {
    return this.http.post(this.REST_API_SERVER+'/guest/search/', postData, { headers: this.HTTP_HEADERS });
  }

  public getDocument(uuid): Observable<any>{
    return this.http.get<any>(this.REST_API_SERVER+'/guest/document/'+ uuid);
  }

  public postContact(postData): Observable<any>{
    return this.http.post(this.REST_API_SERVER+'/guest/contact/', postData, { headers: this.HTTP_HEADERS });
  }

  public getPDF(uuid): Observable<Blob>{
    return this.http.get(this.REST_API_SERVER+'/guest/s3/download/'+ uuid, {
      responseType: 'blob'
    });
  }

}
