import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { CadastroComponent } from './components/pages/cadastro/cadastro.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CadastroContatoComponent } from './components/pages/cadastro-contato/cadastro-contato.component';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cadastrar-contato', component: CadastroContatoComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
