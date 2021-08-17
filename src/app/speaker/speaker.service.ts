import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Speaker } from '../shared/models/speaker';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private urlApi = environment.urlApp;

  constructor(private http: HttpClient) {}

  getSpeakers(): Observable<Speaker[]> {
    return this.http.get<Speaker[]>(this.urlApi + '/speakers').pipe(
      map((rs: any): Speaker[] => {
        //  console.log()
        return rs['collection']['items'];
      })
    );
  }

  getSpeaker(href: string): Observable<string> {
   
    return this.http.get(href, { responseType: 'text' });
  }

  getSesstion(href:string):Observable<Speaker[]>{
    return this.http.get<Speaker[]>(href).pipe(
      map((result:any):Speaker[] =>{
        return result['collection']['items']
      })
    );
  }
  
}
