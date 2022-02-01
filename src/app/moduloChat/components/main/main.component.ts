import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    constructor(public webSocketService: WebSocketService,
                private router: Router) {}

    logoutUser() {

        this.webSocketService.logoutWebShocket();
        this.router.navigateByUrl('/');

    }
}