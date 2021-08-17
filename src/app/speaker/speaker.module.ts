import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerRoutingModule } from './speaker-routing.module';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ItemsComponent   
  ],
  imports: [
    CommonModule,
    SpeakerRoutingModule,
   SharedModule,
  ]
})
export class SpeakerModule { }
