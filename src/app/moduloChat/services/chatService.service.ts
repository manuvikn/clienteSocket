import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from './websocket.service';

@Injectable({
    providedIn:'root'
})
export class ChatService {

    constructor(private webSocketService: WebSocketService) {

    }

    sendMessage(message: string) {

        const payload = {
            origin: this.webSocketService.usuario?.nombre,
            message
        };

        this.webSocketService.emit('message', payload);

    }

    getMessages(): Observable<unknown> {

        return this.webSocketService.listen('new-message');

    }


    getMessagesPrivate() {

        return this.webSocketService.listen('private-message');

    }

    getUsuariosConectados() {

        return this.webSocketService.listen('usuarios-activos');

    }

    emitirUsuariosActivos() {
        return this.webSocketService.emit('emit-usuarios-activos');
    }

}