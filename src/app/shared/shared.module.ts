import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './directive/tooltip.directive';
import { SideDetailComponent } from './components/side-detail/side-detail.component';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    TooltipDirective,     
    SideDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule
  ],
 exports:[
  FormsModule,
  TooltipDirective,   
  SideDetailComponent,
  NgbModule,
  NgxSpinnerModule,
]
 

})
export class SharedModule { }
