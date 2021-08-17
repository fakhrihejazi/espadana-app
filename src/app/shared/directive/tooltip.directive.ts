import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SpeakerService } from 'src/app/speaker/speaker.service';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle = '';

  @Input() placement = '';
  @Input() delay = '';
  tooltip = this.renderer.createElement('pre');
  // HTMLElement = new HTMLElement;

  offset = 10;
  private textObservable$ = new ReplaySubject<string>(1);
  //textNode =this.textObservable$.asObservable();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private speakerService: SpeakerService
  ) {
    this.tooltip = this.renderer.createElement('pre');
  }

  @HostListener('mouseenter') onMouseEnter() {
    // console.log(this.tooltip)
    // if (!this.tooltip.innerHtml) {
    this.show();
    // }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
      //this.textObservable$.unsubscribe();
    }
  }

  show() {
   
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    // console.log('this.tooltip',this.tooltip)
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    
    // window.setTimeout(() => {
    //   this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    //  // this.textObservable$.unsubscribe();
    //   // this.tooltip = null;
    // }, Number(this.delay));
  }

  create() {
    // console.log('create', this.tooltip);
    // this.tooltip = this.renderer.createElement('span');
    let textNode = '';
    //this.textObservable$.
    
    this.getSpeaker().subscribe((result) => {
      console.log(result);
      // this.textObservable$.
      this.textObservable$.next(result);
     
    });


    // console.log('create2', this.tooltip);
    this.textObservable$.asObservable().pipe(take(1)).subscribe((result) => {
      console.log('textNode',textNode);
      textNode = result;
      console.log('createText',result);
    });

    this.tooltip = this.renderer.createElement('pre');
    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(textNode) // textNode
    );

    // this.renderer.appendChild(document.body, this.tooltipTitle);
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    // delay
    this.renderer.setStyle(
      this.tooltip,
      '-webkit-transition',
      `opacity ${this.delay}ms`
    );
    this.renderer.setStyle(
      this.tooltip,
      '-moz-transition',
      `opacity ${this.delay}ms`
    );
    this.renderer.setStyle(
      this.tooltip,
      '-o-transition',
      `opacity ${this.delay}ms`
    );
    this.renderer.setStyle(
      this.tooltip,
      'transition',
      `opacity ${this.delay}ms`
    );
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let top, left;

    top = hostPos.bottom + this.offset;
    left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
  getSpeaker() {
    return this.speakerService.getSpeaker(this.tooltipTitle);
  }
}
