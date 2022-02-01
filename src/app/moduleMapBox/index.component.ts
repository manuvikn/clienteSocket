import { Component } from '@angular/core';
import { WebSocketService } from './services/webSocket.service';

@Component({
    selector: 'index-component',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class MapBoxIndexComponent {
    
    constructor(private wsServer: WebSocketService) {}

}