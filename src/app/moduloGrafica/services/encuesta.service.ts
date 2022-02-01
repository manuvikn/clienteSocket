import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './webSocket.service';

@Injectable({
    providedIn: 'root'
})
export class EncuestaService {

    private readonly API_URL: string = environment.SOCKET_URL;

    constructor(private http: HttpClient,
            private wsService: WebSocketService) {}

    getEncuesta(): Observable<ChartData<'bar'>> {

        return this.http.get(`${this.API_URL}/encuesta`)
            .pipe(map<any, ChartData<'bar'>>(({encuesta}) => encuesta));

    }


    listenChanges() {

        return this.wsService.listen('post-encuesta')
            .pipe(tap(console.log));

    }

}