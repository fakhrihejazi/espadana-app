import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { IData, ISpeakerShow } from 'src/app/shared/models/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.css'],
})
export class ItemDescComponent implements OnInit, AfterViewInit {
  obsSpeakerDesc$!: Observable<string>;
  obsBtnClick$!: Observable<any>;
  @Input()
  speaker!: ISpeakerShow;
  @Output() speakerChecked = new EventEmitter<ISpeakerShow>();
  @ViewChild('btnSave',{static:false}) btnSave!: ElementRef<any>;
  constructor(private speakerService: SpeakerService) {}
  ngAfterViewInit() {    
      fromEvent<any>(this.btnSave.nativeElement, 'click').pipe(
        concatMap(res=>this.saveinfo())
      ).subscribe((res) =>
        console.log(res)
      );   
  }

  ngOnInit() {
   
  }

  toggleWithGreeting(tooltip: any, item: ISpeakerShow) {
    if (item.isChecked === true) {
      tooltip.close();
    } else if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      this.obsSpeakerDesc$ = this.getSpeakerDesc(item.href);
      tooltip.open(this.obsSpeakerDesc$);
    }
  }

  getSpeakerDesc(tooltipTitle: any) {
    return this.speakerService.getSpeaker(tooltipTitle);
  }

  chk_Select(checkBox: any) {
    
    this.speaker.isChecked = checkBox.target.checked;
    this.speakerChecked.emit(this.speaker);
  }
  async saveinfo()
  {
    return this.speakerService.saveInfo(this.speaker);
    
  }
}
