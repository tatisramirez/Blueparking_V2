import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isWifiEnabled: boolean = false;
  public isLocationEnabled: boolean = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private geolocation: Geolocation, private diagnostic: Diagnostic, private platform: Platform) { }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Zonas Azules',
      message: 'Esta es una aplicación que le permitirá visualizar que zonas azules existen cerca a la dirección a donde usted se dirige, permitiendole saber sí hay disponibildiad en estas zonas o no para el parqueo en tiempo real, en caso de que no haya disponibilidad podrá visuailzar cuales parqueaderos públicos existen alrededor para facilitar su estacionamiento',
      buttons: ['OK']
    });
    alert.present();
  }

  goToMaps() {
    this.isLocationAvailable();
    this.isWifiAvailable();
  }

  isWifiAvailable() {
    this.diagnostic.isWifiAvailable()
      .then((isAvailable: any) => {
        console.log(isAvailable);
        this.isWifiEnabled = true;
      })
      .catch((error: any) => {
        console.dir('La aplicacion requiere de datos para continuar:' + error);
      });
  }

  isLocationAvailable() {
    this.diagnostic.isLocationAvailable()
      .then((isAvailable) => {
        console.log(isAvailable);
        this.isLocationEnabled = true;
      })
      .catch((error: any) => {
        console.dir('La aplicacion requiere de GPS para continuar:' + error);
      });
  }
}