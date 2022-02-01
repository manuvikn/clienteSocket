import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { MapaComponent } from './components/mapa.component';
import { MapBoxIndexComponent } from './index.component';

const config: SocketIoConfig = { url: environment.SOCKET_URL, options: {} };

@NgModule({
    imports: [
        CommonModule,
        SocketIoModule.forRoot(config),
        HttpClientModule
    ],
    exports: [
        MapBoxIndexComponent
    ],
    declarations: [
        MapBoxIndexComponent,
        MapaComponent
    ],
    providers: []
})
export class MapBoxModule {}