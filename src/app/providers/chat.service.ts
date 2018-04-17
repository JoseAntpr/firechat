import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ChatService {

  private itemCollection: AngularFirestoreCollection<any>
  public chats: any[] = [];
  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemCollection = this.afs.collection<any>('chats');
    return this.itemCollection.valueChanges();
  }

}
