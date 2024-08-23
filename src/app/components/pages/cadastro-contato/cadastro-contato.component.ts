import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../shared/contact';

@Component({
  selector: 'app-cadastro-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cadastro-contato.component.html',
  styleUrl: './cadastro-contato.component.scss'
})
export class CadastroContatoComponent  implements OnInit {

  formContato!: FormGroup;
  mensagemErro = "";
  submetido = false;
  id = 1;
  
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formContato = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]]
    });
  }


  cadastrarContato(): void {
    console.log(this.service.getUsuarios())
    this.submetido = true;
    if (this.formContato.valid) {
      const contato: Contact = this.formContato.value;
      this.service.cadastrarContato( this.id, contato).subscribe({
        next: () => {
          this.router.navigateByUrl("/contatos");
        },
        error: (err) => {
          this.mensagemErro = "Erro ao cadastrar contato: " + err.message;
        }
      });
    }
  }
}
