import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerRoutingModule } from './speaker-routing.module';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from '../shared/shared.module';
import { SpeakerService } from './speaker.service';
import { ItemComponent } from './item/item.component';
import { ItemDescComponent } from './item-desc/item-desc.component';


@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    ItemDescComponent   
  ],
  imports: [
    CommonModule,
    SpeakerRoutingModule,
   SharedModule,
  ],
  providers:[
    SpeakerService
  ]
})
export class SpeakerModule { }
