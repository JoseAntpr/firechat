import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  constructor(public chatService: ChatService) { }

  ingresar(proveedor: string){
    this.chatService.login(proveedor);
  }

}
