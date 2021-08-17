import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, find, map } from 'rxjs/operators';
import { Speaker } from 'src/app/shared/models/speaker';
import { SpeakerService } from '../speaker.service';

export interface SpeakerShow extends Speaker {
  ishow: boolean;
  isChecked: boolean;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  animations:[
    trigger('openClose', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', [ animate(500) ])
    ])
  ]
})
export class ItemsComponent implements OnInit {
  speakers: SpeakerShow[] = [];
  obsSpeakers$ = new ReplaySubject<SpeakerShow[]>(1);
  obsSpeakerDesc$ = new ReplaySubject<string>(1);
  showSaveButton: boolean = false;
  @ViewChild('search', { static: false }) searchTerm: any;

  constructor(private speakerService: SpeakerService,private ngspinnerService:NgxSpinnerService) {}

  ngOnInit() {
    this.getSpeakers();
  }

  getSpeakers() {
    this.ngspinnerService.show();
    this.speakerService
      .getSpeakers()
      .pipe(
        map((rs: any): SpeakerShow[] => {
          // rs.ishow = false;
          // rs.isChecked = true;
          return rs;
        })
      )
      .subscribe((result) => {
        this.speakers = result;
        this.speakers.forEach((element) => {
          element.ishow = false;
          element.isChecked = false;
        });
        
        this.obsSpeakers$.next(this.speakers);
        this.ngspinnerService.hide();
      });
  }

  btnClickEvent(item: SpeakerShow, isShow: boolean) {
    item.ishow = isShow;
  }

  onSearch() {
    this.ngspinnerService.show();
    let list: SpeakerShow[]  = [];
    this.obsSpeakers$.next(this.speakers);
    if (this.searchTerm.nativeElement.value === '') {
      //this.getSpeakers();
      return;
    }
    this.obsSpeakers$
      .pipe(
        map((p) => p.filter((value: SpeakerShow) => this.filterText(value)))
      )
      .subscribe((result) => {
       // this.speakers = result;
       list =  result;
        this.ngspinnerService.hide();
      });
    this.obsSpeakers$.next(list);
   
  }

  filterText(list: SpeakerShow): any {
    let data = list.data.find((e) => !!e)?.value;
    if (data)
      return (
        data
          .toLowerCase()
          .indexOf(this.searchTerm.nativeElement.value.toLowerCase()) > -1
      );
  }

  chk_Select(checkBox: any, item: SpeakerShow) {
    item.isChecked = checkBox.target.checked;
    this.obsSpeakers$
      .pipe(map((p) => p.find((s) => s.isChecked)))
      .subscribe((result) => {
        if (result) this.showSaveButton = true;
        else this.showSaveButton = false;
      });
  }

  saveSpeakers() {
    let listChange: SpeakerShow[] = [];
    this.obsSpeakers$
      .pipe(map((p) => p.filter((s) => s.isChecked)))
      .subscribe((result) => {
        listChange = result;
      });

    let reduceChange = listChange.reduce(
      (sum, current) => sum + ',' + current.data[0].value,
      ''
    );
    this.getSpeakers();
    alert('change value of Speakers:' + reduceChange);
  }

  toggleWithGreeting(tooltip: any, item: SpeakerShow) {
    let desc: string = '';
    this.obsSpeakerDesc$.next(desc);    
    if (item.isChecked=== true) {
      tooltip.close();
    } else if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      
      this.getSpeakerDesc(item.href).subscribe((result) => {
        desc = result;
        this.obsSpeakerDesc$.next(result);
       
      });
       tooltip.open(this.obsSpeakerDesc$);
    }
  }

  getSpeakerDesc(tooltipTitle: any) {
    return this.speakerService.getSpeaker(tooltipTitle);
  }
}
