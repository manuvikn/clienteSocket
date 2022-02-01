import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './webSocket.service';

@Injectable({
    providedIn: 'root'
})
export class GraficaService {

    private readonly API_URL: string = environment.SOCKET_URL;

    constructor(private http: HttpClient,
            private wsService: WebSocketService) {}

    getGrafica(): Observable<ChartConfiguration['data']> {

        return this.http.get(`${this.API_URL}/grafica`)
            .pipe(map<any, ChartConfiguration['data']>(({grafica}) => grafica));

    }


    listenChanges() {

        return this.wsService.listen('post-grafica');

    }

}