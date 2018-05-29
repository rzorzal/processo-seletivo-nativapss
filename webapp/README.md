# WebAPP

## Requisitos

1. Node.js ^10.0.0
2. NPM ^6.0.0
3. React.js ^16.0.0


## Scripts

1. `$ npm start` Inicia o servidor.
2. `$ npm run build` Gera o build do app.


## Observações

Este app gera uma Progressive Web App (PWA) e utiliza de base dados via IndexdDB.

### Usuário e Senha Padrão

- Login: admin
- Senha: admin

## Mapa do Site

### Login

Página acessivel somente sem sessão ativa.
`/login`

### App - Index

Página inicial do App

### App - Gerenciador de Aluno

#### App - Gerenciador de Aluno - Criar Aluno
`/alunos/cadastrar`
#### App - Gerenciador de Aluno - Mostrar Alunos
`/alunos/mostrar`
#### App - Gerenciador de Aluno - Alterar Aluno
`/alunos/editar`
#### App - Gerenciador de Aluno - Remover Aluno
`/alunos/deletar`

### App - Gerenciador de Professor

#### App - Gerenciador de Professor - Criar Professor
`/professorres/cadastrar`
#### App - Gerenciador de Professor - Mostrar Professor
`/professorres/mostrar`
#### App - Gerenciador de Professor - Alterar Professor
`/professorres/editar`
#### App - Gerenciador de Professor - Remover Professor
`/professorres/deletar`

### App - Gerenciador de Curso

#### App - Gerenciador de Curso - Criar Curso
`/cursos/cadastrar`
#### App - Gerenciador de Curso - Mostrar Curso
`/cursos/mostrar`
#### App - Gerenciador de Curso - Alterar Curso
`/cursos/editar`
#### App - Gerenciador de Curso - Remover Curso
`/cursos/deletar`


## PWA

O uso da PWA foi utilizado por ser de fácil uso para o usuário, que não precisa ter necessariamente internet para acessar, registrando as páginas e componentes em cache e guarando dados utilizando uma base de dados local do browser como o IndexdDB. Sua especificação pode ser acessada [clicando aqui](https://developers.google.com/web/progressive-web-apps/checklist)
