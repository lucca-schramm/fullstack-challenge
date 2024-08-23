# Documentação do Projeto Angular

## Descrição
Este projeto é uma aplicação Angular que utiliza um servidor JSON para simular uma API REST. A aplicação permite gerenciar usuários e contatos, incluindo funcionalidades de cadastro, edição e exclusão.

## Estrutura do Projeto
- **src/app**: Contém os componentes, serviços e modelos da aplicação.
  - **components**: Contém os componentes da aplicação, como `home`, `delete-modal`, `edit-modal`, etc.
  - **services**: Contém os serviços que fazem as requisições HTTP, como `user.service.ts`.
  - **shared**: Contém os modelos de dados, como `user.ts` e `contact.ts`.

## Dependências
- **@angular**: Framework principal para construir a aplicação.
- **@ng-bootstrap/ng-bootstrap**: Integração do Bootstrap com Angular.
- **bootstrap**: Biblioteca de CSS para estilização.
- **json-server**: Servidor JSON para simular uma API REST.
- **concurrently**: Executa múltiplos comandos simultaneamente.

## Scripts do NPM
- **ng**: Comando para executar o Angular CLI.
- **start**: Inicia o servidor JSON e a aplicação Angular simultaneamente.
- **build**: Compila a aplicação para produção.
- **watch**: Compila a aplicação em modo de desenvolvimento e observa por mudanças.
- **test**: Executa os testes unitários.
- **serve:ssr:angular_project**: Serve a aplicação Angular renderizada no servidor.

## Explicação do `npm start`
O script `start` no `package.json` é definido como:

```json
"start": "concurrently \"json-server --watch db.json\" \"ng serve\""

Este script utiliza o pacote concurrently para executar dois comandos ao mesmo tempo:

json-server --watch db.json: Inicia o servidor JSON e observa o arquivo db.json para mudanças. Este servidor simula uma API REST que a aplicação Angular pode usar para fazer requisições HTTP.

ng serve: Inicia o servidor de desenvolvimento do Angular, que compila a aplicação e a serve em http://localhost:4200.


## Como Executar o Projeto
1 - Instalar Dependências: Execute npm install para instalar todas as dependências do projeto.
2 - Iniciar o Projeto: Execute npm start para iniciar o servidor JSON e a aplicação Angular simultaneamente.
3 - Acessar a Aplicação: Abra o navegador e vá para http://localhost:4200 para ver a aplicação em execução.