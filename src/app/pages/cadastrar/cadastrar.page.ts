import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Times } from 'src/app/class/times';
import { TimesCRUDService } from 'src/app/services/times-crud.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  private _nome: string
  private _telefone: number
  private _time_coracao: string
  private _time_odiado: string
  private _selecao: string
  private _idolo: string
  private _posicao: string
  private _formCadastrar : FormGroup;
  private _isSubmitted : boolean = false;

  constructor(public alertController: AlertController, 
    private _router: Router, 
    private _crudService: TimesCRUDService,
    private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this._formCadastrar= this._formBuilder.group({
    nome : ['', [Validators.required, Validators.minLength(8)]],
    telefone : ['', [Validators.required, Validators.maxLength(10)]],
    time_coracao : ['', [Validators.required]],
    time_odiado : ['', [Validators.required]],
    selecao : ['', [Validators.required]],
    idolo : ['', [Validators.required]],
    posicao : ['', [Validators.required]],
    });
  }

  private get errorControl(){
    return this._formCadastrar.controls;
  }

  private submitForm() : boolean{
    this._isSubmitted = true;
    if(!this._formCadastrar.valid){
      this.presentAlert("Atenção usuário", "Cadastro Inválido", "Todos os campos são obrigatórios.");
      return false;
    }else{
      this.cadastrar()
    }
  }

  private cadastrar(): void{
      let time: Times = new Times(
        this._formCadastrar.value['nome'], 
        this._formCadastrar.value['telefone'],  
        this._formCadastrar.value['time_coracao'], 
        this._formCadastrar.value['time_odiado'], 
        this._formCadastrar.value['selecao'],
        this._formCadastrar.value['idolo'], 
        this._formCadastrar.value['posicao'])

      this._crudService.createTimes(time).then(() =>{
        this.presentAlert("Atenção usuário", "Dados atualizados", "Cadastro Efetuado!")
        this._router.navigate(["home"])
      })
      .catch((error) => {
        this.presentAlert("Atenção usuário", "Erro ao cadastrar", "Tente novamente!")
        console.log(error.message)
      })
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