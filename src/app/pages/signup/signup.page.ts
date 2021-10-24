import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private _formCadastrar: FormGroup
  _isSubmitted = false
  
  constructor(public alertController: AlertController, private _router: Router, 
    public formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this._formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl(){
    return this._formCadastrar.controls;
  }

  submitForm(){
    this._isSubmitted = true
    if(!this._formCadastrar.valid){
      this.presentAlert("Pelada", "SignIn", "Todos os campos são obrigatórios!")
      return false
    }
    else{
      this._signUp()
    }
  }

  private _signUp() : void{
    this.authService.signUpWithEmailAndPass(this._formCadastrar.value['email'], 
    this._formCadastrar.value['senha']).then((res) => {
      this.presentAlert("Pelada", "SignUp", "Cadastro Efetuado!")
      this._router.navigate(["/signin"])
    })
    .catch((error) => {
      this.presentAlert("Pelada", "Erro", "Erro ao Cadastrar!")
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
    this._router.navigate(["/signin"])
  }

}
