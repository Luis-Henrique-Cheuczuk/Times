import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Times } from 'src/app/class/times';
import { AlertController } from '@ionic/angular';
import { TimesCRUDService } from 'src/app/services/times-crud.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  private _times: Times
  private _nome: string
  private _telefone: number
  private _time_coracao: string
  private _time_odiado: string
  private _selecao: string
  private _idolo: string
  private _posicao: string
  private _editar: boolean = true

  constructor(private _router: Router, public alertController: AlertController, 
    private _crudService: TimesCRUDService) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation()
    this._times = nav.extras.state.objeto
    this._nome = this._times.getNome()
    this._telefone = this._times.getTelefone()
    this._time_coracao = this._times.getTimeCoracao()
    this._time_odiado = this._times.getTimeOdiado()
    this._selecao = this._times.getSelecao()
    this._idolo = this._times.getIdolo()
    this._posicao = this._times.getPosicao()
  }

  private alterarEdicao(): void {
    if (this._editar == true) {
      this._editar = false
    } else {
      this._editar = true
    }
  }

  private editar(): void {
    if (this.validar(this._nome) && this.validar(this._telefone) && this.validar(this._time_coracao) && this.validar(this._time_odiado) && this.validar(this._selecao) && this.validar(this._idolo) && this.validar(this._posicao)) {
      let timeEditado: Times = new Times(this._nome, this._telefone, this._time_coracao, this._time_odiado, this._selecao, this._idolo, this._posicao)
      this._crudService.editTime(this._times.getId(), timeEditado).then(() => {
        this.presentAlert("Atenção usuário", "------------------------------", "Edição Efetuada.")
        this._router.navigate(["home"])
      })
      .catch((error) => {
        this.presentAlert("Atenção usuário", "Editar - Erro", "Edição Inválida.")
        console.log(error.message)
      })
    }
  }  

    private excluir(): void{
      this._crudService.removeTime(this._times.getId()).then(() => {
        this.presentAlert("Atenção usuário", "------------------------------", "Dado Excluído.")
        this._router.navigate(["home"])
      })
      .catch((error) => {
        this.presentAlert("Atenção usuário", "Editar - Erro", "Dado Inválido.")

        console.log(error.message)
      })
    }

  private validar(campo: any): boolean {
    if (!campo) {
      return false
    } else {
      return true
    }
  }

  async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  private homepage(): void {
    this._router.navigate(["/home"])
  }


}