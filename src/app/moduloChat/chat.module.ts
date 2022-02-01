import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './index.component';
import { ChatRoutingModule } from './chat.routing.module';

const config: SocketIoConfig = { url: environment.SOCKET_URL, options: {} };

@NgModule({
    declarations: [
        IndexComponent,
        MainComponent,
        FooterComponent,
        ChatComponent,
        ListaUsuariosComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        SocketIoModule.forRoot(config),
        ChatRoutingModule,
        FormsModule
    ],
    exports: [
        IndexComponent
    ],
    providers: []
})
export class ChatModule { }
