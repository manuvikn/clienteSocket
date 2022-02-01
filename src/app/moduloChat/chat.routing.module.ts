import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { UsuarioGuard } from './guards/usuario.guard';

const ROUTES: Routes = [
    {path: '', component: LoginComponent},
    {path: 'mensajes', component: MainComponent, canActivate: [UsuarioGuard]},
    {path: '**', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class ChatRoutingModule {}