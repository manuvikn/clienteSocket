import { Component } from '@angular/core';
import { WebSocketService } from './services/webSocket.service';

@Component({
    selector: 'grafica-component',
    templateUrl: './graficaIndex.component.html',
    styleUrls: ['./graficaIndex.component.scss']
})
export class GraficaIndexComponent {

    constructor(private wsService: WebSocketService) {}

}