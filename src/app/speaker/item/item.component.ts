import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpeakerShow } from 'src/app/shared/models/speaker';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
    trigger('openClose', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', [animate(250)]),
    ]),
  ],
})
export class ItemComponent implements OnInit {

  @Input() speakerdata !:ISpeakerShow;
  @Input() isEven:boolean = false;
  @Input() isOdd:boolean = false;
  @Output() speakerChecked=new EventEmitter<ISpeakerShow>()

  constructor() { }

  ngOnInit(): void {
  }

  btnClickEvent(item: ISpeakerShow, isShow: boolean) {
    item.ishow = isShow;
  }

  onSpeakerChecked(event:any)
  {
     this.speakerChecked.emit(this.speakerdata);
  }

  
}
