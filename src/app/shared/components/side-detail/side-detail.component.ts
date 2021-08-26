import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {  Observable, ReplaySubject } from 'rxjs';
import { SpeakerService } from 'src/app/speaker/speaker.service';
import { ILink, ISpeaker } from '../../models/speaker';

@Component({
  selector: 'app-side-detail',
  templateUrl: './side-detail.component.html',
  styleUrls: ['./side-detail.component.css'], 
 
})
export class SideDetailComponent implements OnInit {
  @Input() sesstion: ILink[] = [];
  @Input() isShow :boolean=false;
  dataSesstion$: Observable<ISpeaker[]> | undefined;

  constructor(private speakerService: SpeakerService) {
    
  }

  ngOnInit() {
    if (this.isShow) {
      const href = this.sesstion.find((e) => !!e)?.href;
      if (href) {
     this.dataSesstion$ = this.speakerService.getSesstion(href);
      }
    }
  }

  getSesstion(href: string) {
    
    this.speakerService.getSesstion(href);
  }
}
