import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {  Observable, ReplaySubject } from 'rxjs';
import { SpeakerService } from 'src/app/speaker/speaker.service';
import { Link, Speaker } from '../../models/speaker';

@Component({
  selector: 'app-side-detail',
  templateUrl: './side-detail.component.html',
  styleUrls: ['./side-detail.component.css'], 
 
})
export class SideDetailComponent implements OnInit {
  @Input() sesstion: Link[] = [];
  @Input() isShow :boolean=false;
  dataSesstion: Speaker[] = [];
  // showSide$ :Observable<boolean> = new Observable<boolean>();

  constructor(private speakerService: SpeakerService) {
    
  }

  ngOnInit() {
    if (this.isShow) {
      const href = this.sesstion.find((e) => !!e)?.href;
      if (href) {
        // console.log(this.sesstion);
        // console.log(href);        
      this.getSesstion(href);
      }
    }
  }

  getSesstion(href: string) {
    
    this.speakerService.getSesstion(href).subscribe((result) => {
      this.dataSesstion = result;
    });
  }
}
