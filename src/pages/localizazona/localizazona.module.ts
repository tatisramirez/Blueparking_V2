import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalizazonaPage } from './localizazona';

@NgModule({
  declarations: [
    LocalizazonaPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalizazonaPage),
  ],
})
export class LocalizazonaPageModule {}
