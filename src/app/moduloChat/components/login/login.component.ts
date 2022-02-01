import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nombre: string = '';

  constructor(public webSocketService: WebSocketService,
      private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.nombre = this.nombre.trim();
    if (this.nombre == '') return;

    this.webSocketService.loginWebShocket(this.nombre)
      .then(() => this.router.navigateByUrl('/mensajes'));
    this.nombre = '';
  }

}
