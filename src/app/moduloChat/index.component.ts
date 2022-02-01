import { Component } from '@angular/core';
import { ChatService } from './services/chatService.service';
import { WebSocketService } from './services/websocket.service';

@Component({
    selector: 'index-component',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {

    constructor(private webSocketService: WebSocketService,
        private chatService: ChatService) { }


    ngOnInit(): void {

        this.chatService.getMessagesPrivate()
            .subscribe(console.log);

    }


}