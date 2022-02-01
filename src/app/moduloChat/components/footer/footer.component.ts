import { Component } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
@Component({
    selector: 'footer-component',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    constructor(public webSocketService: WebSocketService) {}

}