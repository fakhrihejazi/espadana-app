import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ILink, ISpeaker } from '../shared/models/speaker';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private urlApi = environment.urlApp;
  speakerSession: ISpeaker[] = [];

  constructor(private http: HttpClient) {}

  getSpeakers(): Observable<ISpeaker[]> {
    return this.http.get<ISpeaker[]>(this.urlApi + '/speakers').pipe(
      map((res: any) => res['collection']['items']),
    );
  }

  getSpeaker(href: string): Observable<string> {
    return this.http.get(href, { responseType: 'text' });
  }

  getSesstion(href: string): Observable<ISpeaker[]> {
    let data: ISpeaker[] = [];
    let findSesstion = this.speakerSession.find((f) =>
      this.findsesstionId(f.links, href)
    );
    if (findSesstion) {
      let result = this.speakerSession;
      let link = findSesstion.links.find((f) =>
        f.href.includes('speaker')
      )?.href;
      let href = link ?? '';

      result = result.filter((f) => this.filterSesstion(f.links, href));
      return of(result);
    }
    return this.http.get<ISpeaker[]>(href).pipe(
      map((res: any): ISpeaker[] => {
        data = Object.values(res['collection']['items']);
        this.speakerSession = [...this.speakerSession, ...data];
        return data;
      })
    );
  }

  findsesstionId(links: ILink[], href: string) {
    return links.find((f) => href.indexOf(f.href) > -1);
  }
  filterSesstion(links: ILink[], href: string) {
    let result = links.find((f) => href.indexOf(f.href) > -1);
    return result;
  }


  saveInfo(speaker:ISpeaker)
  {
    console.log('speaker')
    console.log(speaker)
  }
}
