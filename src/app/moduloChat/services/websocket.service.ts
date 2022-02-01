import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    socketStatus: boolean = false;
    usuario: Usuario | undefined;

    constructor(private socket: Socket) {
        this.loadStorage();
        this.checkStatus();
    }
    
    checkStatus(): void {

        this.socket.on('connect', () => {
            console.log('Conectado al servidor');
            this.socketStatus = true;
            this.loadStorage();
        });

        this.socket.on('disconnect', () => {
            console.log('Desconectdo del servidor');
            this.socketStatus = false;
        });
    }

    emit(event: string, payload?: any, callback?: Function): void {

        this.socket.emit(event, payload, callback);

    }

    listen(evento: string): Observable<unknown> {

        return this.socket.fromEvent(evento);

    }

    loginWebShocket(nombre: string) {

        return new Promise<void>((resolve, reject) => {
            this.emit('conf-user', {nombre}, (res: any) => {
                this.usuario = new Usuario(nombre);
                this.saveStorage();
                resolve();
            });
        });


    }

    logoutWebShocket() {

        this.usuario = undefined;
        localStorage.removeItem('usuario');
        this.emit('conf-user', {nombre: 'sin-nombre'}, () => {});

    }

    saveStorage() {

        localStorage.setItem('usuario', JSON.stringify(this.usuario));

    }

    loadStorage() {

        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            this.usuario = JSON.parse(usuario);
            this.loginWebShocket(this.usuario?.nombre || '');
        }

    }


}