import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private _formLogar: FormGroup
  _isSubmitted = false

  constructor(public alertController: AlertController, private _router: Router, 
  public formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this._formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl(){
    return this._formLogar.controls;
  }

  submitForm(){
    this._isSubmitted = true
    if(!this._formLogar.valid){
      this.presentAlert("Pelada", "SignIn", "Todos os campos são obrigatórios!")
      return false
    }
    else{
      this._signIn()
    }
  }

  private _signIn() : void{
    this.authService.signIn(this._formLogar.value['email'], this._formLogar.value['senha']).then((res) => {
      this.presentAlert("Pelada", "SignIn", "Seja bem vindo!")
      this._router.navigate(["/home"])
    })
    .catch((error) =>{
      this.presentAlert("Pelada", "Erro ao Logar", "Tente novamente!")
      console.log(error.message)
    })
  }

  private _signInGoogle() : void {
    this.authService.signInWithGoogle()
  }

  private _irParaSignUp() : void {
    this._router.navigate(["/signup"])
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

}
