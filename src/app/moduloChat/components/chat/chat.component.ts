import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { ChatService } from '../../services/chatService.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('messagesContainer') messagesContainer: ElementRef | undefined;

  message: string = '';
  messages: Array<any> = [];
  usuario: Usuario | undefined;

  constructor(private chatService: ChatService,
    private webSocketService: WebSocketService) { }

  listenMessageSource: Subscription | undefined;

  ngOnInit(): void {
    this.listenMessages();
    this.usuario = this.webSocketService.usuario;
  }

  ngOnDestroy(): void {
    this.listenMessageSource?.unsubscribe();
  }

  sendMessage() {

    this.message = this.message.trim();
    if (this.message === '') return;
    this.chatService.sendMessage(this.message);
    this.message = '';

  }


  listenMessages() {

    this.listenMessageSource = this.chatService.getMessages()
      .subscribe(message => this.addMessage(message));

  }

  addMessage(message: any) {

    this.messages.push(message);

    const element = this.messagesContainer;

    setTimeout(() => {
      if (element) {
        element.nativeElement.scrollTop = element.nativeElement.scrollHeight;
      }
    });

  }

}
