import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: []
})
export class ChatComponent{

  mensaje: string ="";

  constructor(public chatService: ChatService) {

    this.chatService.cargarMensajes().subscribe( (mensajes:any[]) => {
      console.log(mensajes);
    })
   }



  enviar_mensaje(){
    console.log(this.mensaje);
  }

}
