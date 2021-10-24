import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Times } from 'src/app/class/times';
import { AuthService } from 'src/app/services/auth.service';
import { TimesCRUDService } from 'src/app/services/times-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data: any
  private _dados_times: Times[]

  constructor(private _router: Router, private _crudService: TimesCRUDService, public authService: AuthService) {
    this.data = this._crudService.getTimes()
    this.data.forEach(data => {
      const lista = data as Array<any>
      this._dados_times = []
      lista.forEach(c => {
        let time = new Times(c.data._nome, c.data._telefone, c.data._time_coracao, c.data._time_odiado,
        c.data._selecao, c.data._idolo, c.data._posicao)
        time.setId(c.key)
        this._dados_times.push(time)
      })
    })
  }

  private cadastrarPage(): void {
    this._router.navigate(["/cadastrar"])
  }

  public detalhar(times: Times): void{
    this._router.navigateByUrl("/detalhar", {state: {objeto: times}})
  }

  public logout(): void{
    this.authService.signOut()
  }
}
