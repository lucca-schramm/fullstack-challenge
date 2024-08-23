import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogar!: FormGroup;
  mensagemErro = "";
  submetido = false;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogar = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  btnInscrever() {
    this.router.navigateByUrl("/cadastro");
  }

  logar(): void {
    this.submetido = true;
    if (this.formLogar.valid) {
      const form = this.formLogar.value;
      this.service.login(form.email).subscribe((resposta: User[]) => {
        console.log(resposta);
        if (resposta.length) {
          if (resposta[0].senha === form.senha) {
            this.authService.login();
            this.router.navigateByUrl("/home");
          } else {
            this.mensagemErro = "Usuário ou Senha inválida";
          }
        } else {
          this.mensagemErro = "Usuário ou Senha inválida";
        }
      });
    }
  }
}
