import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {
  show: boolean = true;
  showSpinner: boolean = true;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController) {
  }
  
  ionViewDidLoad() {
    setTimeout(() => {
      this.navCtrl.setRoot(HomePage)
    }, 4000);
    

  }

}

