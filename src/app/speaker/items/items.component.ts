import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ISpeakerShow } from 'src/app/shared/models/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  animations: [
    trigger('openClose', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', [animate(500)]),
    ]),
  ],
})
export class ItemsComponent implements OnInit, AfterViewInit {
  obsSpeakers$!: Observable<ISpeakerShow[]>;
  obsSpeakerDesc$: Observable<string> | undefined;
  showSaveButton$!: Observable<boolean>;
  @ViewChild('search', { static: false }) searchTerm: any;

  constructor(
    private speakerService: SpeakerService,
    private ngspinnerService: NgxSpinnerService
  ) {}

  ngAfterViewInit(): void {
    this.obsSpeakers$ = fromEvent<any>(
      this.searchTerm.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.getSpeakers(search))
    );

    //this.obsSpeakers$.pipe(map(res=>res.find(f=>f.isChecked))).subscribe(res=>{console.log('res');console.log(res)})
    // fromEvent<any>(this.editButton.nativeElement,'click').pipe(map((event)=>{tap(res=>console.log('res'))}))
  }

  ngOnInit() {}

  getSpeakers(search = ''): Observable<ISpeakerShow[]> {
    return (
      this.speakerService.getSpeakers() as Observable<ISpeakerShow[]>
    ).pipe(
      map((res) => {
        const result = res.filter((f) => this.filterText(f, search));
        this.setDefaultValue(result);
        return result;
      })
    );
  }

  setDefaultValue(value: ISpeakerShow[]) {
    value.map((res) => {
      (res.ishow = false), (res.isChecked = false);
    });
  }

  btnClickEvent(item: ISpeakerShow, isShow: boolean) {
    item.ishow = isShow;
  }

  filterText(list: ISpeakerShow, search = '') {
    const data = list.data.find((e) => !!e)?.value.toLowerCase();
    if (data) {
      return data.indexOf(search.toLowerCase()) > -1;
    } else return true;
  }

  saveSpeakers() {
    let listChange: ISpeakerShow[] = [];
    this.obsSpeakers$
      .pipe(map((p) => p.filter((s) => s.isChecked)))
      .subscribe((result) => {
        console.log('listChange');
        console.log(result);
        listChange = result;
      });
    let reduceChange = listChange.reduce(
      (sum, current) => sum + ',' + current.data[0].value,
      ''
    );
    this.getSpeakers();
    alert('change value of Speakers:' + reduceChange);
  }


  onspeakerChecked(event: any) {
    console.log('onspeakerChecked');
    console.log(event);
  }
}
