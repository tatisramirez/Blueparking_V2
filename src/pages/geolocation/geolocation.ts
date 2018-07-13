import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Polygon,
  ILatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html'
})
export class GeolocationPage {
  map: GoogleMap;
  coordsActual: Coordinates;
  area: Polygon;
  area2: Polygon;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let marker: Marker;

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        console.log(resp);
        this.coordsActual = resp.coords;
        return this.createMap(resp.coords);
      }).then((newMap) => {
        this.map = newMap;

        return this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.coordsActual.latitude,
            lng: this.coordsActual.longitude
          }
        })
      }).then((markerCreate: Marker) => {
        marker = markerCreate;
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('clicked');
        });
        let POINTS: ILatLng[] = [
          { lat: 4.669266, lng: -74.103907 },
          { lat: 4.671147, lng: -74.102105},
          { lat: 4.6710993, lng: -74.1041967 }
        ];
        
        return this.createArea(POINTS);
      }).then(poly => {
        this.area2 = poly;
        
        let POINTS: ILatLng[] = [
          { lat: 4.169266, lng: -74.503907 },
          { lat: 4.171147, lng: -74.502105},
          { lat: 4.1710993, lng: -74.5041967 }
        ];
        
        return this.createArea(POINTS);
      }).then(poly => {
        this.area = poly;
        this.geolocation.watchPosition().subscribe((data) => {
          console.log(data.coords);
          marker.setPosition({lat: data.coords.latitude, lng: data.coords.longitude});
        });
      });

  }

  createMap(coords) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: coords.latitude,
          lng: coords.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    return GoogleMaps.create('map_canvas', mapOptions);
  }

    createArea(POINTS) {
      return this.map.addPolygon({
        'points': POINTS,
        'strokeColor': '#AA00FF',
        'fillColor': '#00FFAA',
        'strokeWidth': 10
      });
  }
}
