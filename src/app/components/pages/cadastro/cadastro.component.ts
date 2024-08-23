import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formulario!: FormGroup;
  submetido = false;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('^(?=.*?[!@#$%¨&*])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]]
    });
  }

  btnEntrar(): void {
    this.router.navigateByUrl("/home");
  }

  cadastrar(): void {
    console.log(this.formulario.controls);
    this.submetido = true;
    if (this.formulario.valid) {
      const form = this.formulario.value;
      const id = Math.floor(Date.now() * Math.random());
      const usuario: User = {
        id: id,
        name: form.name,
        emails: form.email,
        senha: form.senha,
        telefone: form.telefone,
        contacts: [],
        createdAt: new Date()
      };
      this.service.cadastrar(usuario).subscribe(() => {
        this.router.navigateByUrl("/login");
      });
    }
  }
}
