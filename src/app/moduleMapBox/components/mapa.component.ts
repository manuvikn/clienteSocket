import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Lugar } from '../interfaces/lugar';
import { MapService } from '../services/map.service';
import { WebSocketService } from '../services/webSocket.service';

@Component({
    selector: 'mapa-component',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

    mapa: mapboxgl.Map | undefined;
    lugares: {[key:string]: Lugar} = {};
    markerMapbox: {[key:string]: mapboxgl.Marker} = {};


    constructor(private mapService: MapService,
                private wsService: WebSocketService) {}

    ngOnInit(): void {
        this.crearMapa();
        this.listenNewMarcador();
        this.listenMoveMarcador();
        this.listenRemoveMarcador();
    }

    crearMapa(): void {
 
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFudXZpa24iLCJhIjoiY2t6MmY0aG82MGkwdzJ2bXZsMjkzYzFobiJ9.w8M8KhWOsERTctGuHpAQkw';
        this.mapa = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-0.956662, 37.818694], // starting position [lng, lat]
        zoom: 15 // starting zoom
        });

        this.getMarcadores();
        // this.lugares.forEach(lugar => this.addMarcador(lugar));

    }

    getMarcadores(): void {

        this.mapService.getMarcadores()
            .subscribe(data => {
                this.lugares = data;
                Object.values(data).forEach(data => this.addMarcador(data));
            });

    }

    addMarcador(marcador: Lugar): void {

        if (!this.mapa) return;

        const h2 = document.createElement('h2');
        h2.innerHTML = marcador.nombre;

        const btnBorrar = document.createElement('button');
        btnBorrar.innerHTML = "Borrar";
        btnBorrar.classList.add('btn', 'btn-primary');

        const div = document.createElement('div');
        div.append(h2, btnBorrar);

        /* const html = `<h2>${marcador.nombre}</h2>
                      <br>
                      <button class="btn btn-primary">Borrar</button>`; */

        const customPopup = new mapboxgl.Popup({
            offset: 25,
            closeOnClick: false
        }).setDOMContent(div);

        const marker = new mapboxgl.Marker({
            draggable: true,
            color: marcador.color
        })
        .setLngLat([marcador.lng, marcador.lat])
        .setPopup(customPopup)
        .addTo(this.mapa);

        marker.on('drag', () => {
            this.wsService.emit('move-marcador', {...this.markerMapbox[marcador.id].getLngLat(), id: marcador.id});
        });

        btnBorrar.addEventListener('click', () => {
            
            marker.remove();
            this.wsService.emit('remove-marcador', marcador.id);

        });

        this.markerMapbox[marcador.id] = marker;

    }

    crearMarcador() {

        const customMarker: Lugar = {

            id: new Date().toISOString(),
            lng: -0.956662,
            lat: 37.818694,
            nombre: 'Sin nombre',
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)

        };

        this.addMarcador(customMarker);
        this.wsService.emit('post-marcador', customMarker);

    }

    listenNewMarcador(): void {

        this.wsService.listen('update-marcadores')
            .subscribe(data => this.addMarcador(data));

    }

    listenMoveMarcador(): void {
        
        this.wsService.listen('server-move-marcador')
            .subscribe(data => this.markerMapbox[data.id].setLngLat([data.lng, data.lat]));

    }

    listenRemoveMarcador(): void {

        this.wsService.listen('server-remove-marcador')
            .subscribe(id => this.markerMapbox[id].remove());

    }

}