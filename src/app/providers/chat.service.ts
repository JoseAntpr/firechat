import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  private itemCollection: AngularFirestoreCollection<any>
  public chats: Mensaje[] = [];
  public usuario: any = {}
  constructor(private afs: AngularFirestore, public fauth: AngularFireAuth) { 
    this.fauth.authState.subscribe( user => {
      console.log(user);
      if( !user){
        return;
      }
      this.usuario.nombre = user.displayName
      this.usuario.uid = user.uid;
    })
  }

  login(proveedor :string) {
    if(proveedor == 'google'){
      this.fauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }else{
      this.fauth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
    
  }

  logout() {
    this.usuario = {};
    this.fauth.auth.signOut();
  }

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
