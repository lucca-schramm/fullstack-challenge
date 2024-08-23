import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';
import { Contact } from '../shared/contact';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUser = 'http://localhost:3000/usuario';
  private apiContact = 'http://localhost:3000/contato';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: User): Observable<User> {
    return this.http.post<User>(this.apiUser, usuario);
  }

  login(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUser}?email=${email}`);
  }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUser);
  }

  deletarUsuario(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUser}/${id}`);
  }

  editarUsuario(usuario: User): Observable<User> {
    return this.http.put<User>(`${this.apiUser}/${usuario.id}`, usuario);
  }

  getContatos(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiContact);
  }

  deletarContatos(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${this.apiContact}/${id}`);
  }

  editarContatos(contato: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiContact}/${contato.id}`, contato);
  }

  cadastrarContato(userId: number, contato: Contact): Observable<User> {
    return this.http.post<Contact>(`${this.apiUser}/${userId}/contatos`, contato).pipe(
      switchMap(newContact => {
        return this.http.get<User>(`${this.apiUser}/${userId}`).pipe(
          map(user => {
            user.contacts.push(newContact);
            return user;
          }),
          switchMap(updatedUser => this.http.put<User>(`${this.apiUser}/${userId}`, updatedUser))
        );
      })
    );
  }
}
