import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  private itemCollection: AngularFirestoreCollection<any>
  public chats: Mensaje[] = [];
  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', "desc").limit(10));
    return this.itemCollection.valueChanges()
                              .map( (mensajes: Mensaje[]) => {
                                console.log("Cargando los mensajes: ", mensajes );
                                this.chats = mensajes.reverse();
                              });
  }

  agregarMensaje( texto:string ){
    let mensaje: Mensaje = {
      nombre: 'José Antonio',
      mensaje: texto,
      fecha: new Date().getTime()
    }
    return this.itemCollection.add( mensaje )
  }

}
