import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './speaker/items/items.component';

const routes: Routes = [
  {
    path: '',   
    loadChildren: () =>
      import('./speaker/speaker.module').then((mod) => {
      return  mod.SpeakerModule;
      }),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
