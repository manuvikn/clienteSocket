import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { GraficaIndexComponent } from './graficaIndex.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

const config: SocketIoConfig = { url: environment.SOCKET_URL, options: {} };

@NgModule({
    imports: [
        CommonModule,
        SocketIoModule.forRoot(config),
        NgChartsModule,
        HttpClientModule
    ],
    exports: [
        GraficaIndexComponent
    ],
    declarations: [
        GraficaIndexComponent,
        GraficaComponent,
        EncuestaComponent
    ],
    providers: []
})
export class GraficaModule {
}
