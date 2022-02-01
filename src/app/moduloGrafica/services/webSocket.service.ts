import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    socketStatus: boolean = false;

    constructor(private socket: Socket) {

        this.checkStatus();

    }


    checkStatus(): void {

        this.socket.on('connect', () => {

            console.log('Conectado al servidor');
            this.socketStatus = true;
            
        });
        this.socket.on('disconnect', () => {

            console.log('Desconectado del servidor');
            this.socketStatus = false;
            
        });
    }


    listen(eventName: string): Observable<any> {

        return this.socket.fromEvent(eventName);

    }


    emit(eventName: string, payload?: any, callback?: Function): void {

        this.socket.emit(eventName, payload, callback);

    }

}