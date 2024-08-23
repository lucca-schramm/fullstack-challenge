import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../shared/contact';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contatos: Array<Contact> = []

  listasContatos = new Subject<Array<Contact>>();

  alert = false

  mensagem = ""

  constructor(
    private service: UserService,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getContatos()

    this.listasContatos.subscribe((respostaSubject: Array<Contact>) => {
      this.contatos = respostaSubject
    })
  }

  modalDeletar(id: number) {
    const modal = this._modalService.open(DeleteModalComponent, { centered: true });
    modal.closed.subscribe(() => {
      this.service.deletarContatos(id).subscribe(() => {
        this.getContatos()
        this.alert = true
        this.mensagem = "Contato excluído com sucesso!"
        setTimeout(() => {
          this.alert = false
        }, 3000);
      })
    })
  }

  modalEditar(item: Contact) {
    const modal = this._modalService.open(EditModalComponent, { centered: true });
    modal.componentInstance.nome = item.name
    modal.componentInstance.email = item.emails
    modal.componentInstance.telefone = item.telefone

    modal.closed.subscribe((resposta) => {
      console.log(resposta)
      const contato: Contact = {
        id: item.id,
        name: resposta.nome,
        emails: resposta.email,
        telefone: resposta.telefone,
      }
      this.service.editarContatos(contato).subscribe(() => {
        this.getContatos()
        this.alert = true
        this.mensagem = "Contato alterado com sucesso!"
        setTimeout(() => {
          this.alert = false
        }, 3000);
      })
    })
  }

  getContatos() {
    this.service.getContatos().subscribe((respostaApi: Array<Contact>) => {
      this.listasContatos.next(respostaApi)
    })
  }
}
