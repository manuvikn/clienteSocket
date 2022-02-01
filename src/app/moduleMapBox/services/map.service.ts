import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lugar } from '../interfaces/lugar';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    private readonly API_URL: string = environment.SOCKET_URL;

    constructor(private http: HttpClient) {}

    getMarcadores(): Observable<{[key: string]: Lugar}> {

        return this.http.get<{[key: string]: Lugar}>(`${this.API_URL}/mapbox`);

    }

}