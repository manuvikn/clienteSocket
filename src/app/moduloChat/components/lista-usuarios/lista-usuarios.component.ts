import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chatService.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivos$: Observable<any> | undefined;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.usuariosActivos$ = this.chatService.getUsuariosConectados();
    this.chatService.emitirUsuariosActivos();
  }

}
