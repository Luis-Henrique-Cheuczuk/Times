import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Times } from '../class/times';
import { map } from 'rxjs/operators'
import { User } from '../class/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimesCRUDService {
  private _PATH : string = 'times/'
  private _user: User

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this._user = this.auth.getUserLogado()
    this._PATH = this._PATH +""+this._user.uid
  }

  createTimes(times : Times){
    return this.db.database.ref(this._PATH).push(times)
  }

  editTime(key : any, times : any){
    return this.db.database.ref(this._PATH).child(key).update(times)
  }

  removeTime(key: any){
    return this.db.database.ref(this._PATH+"/"+key).remove()
  }

  getTimes(){
    return this.db.list(this._PATH).snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    )
  }

  getTime(key: string){
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    )
  }

}
