# Documentação da API

## Padrões Utilizados

### Rest API

O padrão Rest foi escolhido por ser desenvolvido por diversos programadores e por ser de fácil compreenção e não necessita de adoção de tecnologias de terceiros e bibliotecas para consumo e desenvolvimento, somente padrões definidos já é o suficiente. Sua especificação pode ser consultado [clicando aqui](https://www.w3.org/2001/sw/wiki/REST).

### JSON

Para facilitar comunicação a API utiliza a formatação JSON, que é bastante utilizada entre os desenvolvedores para trocar dados entre servidores e clientes. Também é utilizada como formatação de linguaguens de programação para definição de objetos, como é o caso do Javascript. Usa especificação por ser consultada [clicando aqui](https://tools.ietf.org/html/rfc7159) e sua especificação de parser e formatação [clicando aqui](https://www.json.org)

### Middlewares

Os middlewares são entidades utilizadas pelo servidor e são conhecidas por tratarem as requisições antes de serem executadas por suas rotas finais. Eles conseguem injetar dependências e comportamentos, rejetar requisições e modificarem escopos e etc. Seu uso e especificação podem ser consultados [clicando aqui](https://expressjs.com/en/guide/using-middleware.html#middleware.built-in).

### Models (ORM)

Para trabalhar com a camada de dados, foi escolhido o conceito de Object Relation Mapping (ORM), e foi implementado seguindo a biblioteca [Sequelize](http://docs.sequelizejs.com/). Eles são necessários para buscar/alterar/criar/remover dados do banco de dados e mapear o dominio da aplicação, neles podem ser definidos métodos e gatilhos para cada modelo do sistema.

## Requisitos

1. Node.js ^10.0.0
2. NPM ^6.0.0
3. Postgres ^9.0.0

## Instalação

1. ``` $ cd /path/to/project ```
2. ``` $ npm install ```
3. ``` $ npm run dev ```

## Scripts

1. ``` $ npm start ``` Inicia o servidor em produção
2. ``` $ npm run dev ``` Inicia o servidor em modo dev
3. ``` $ npm run reset ``` Reseta o banco de dados

## Arquitetura de pastas

### bin

Pasta onde se localizam os scripts de execução, como iniciação do servidor, resete de banco de dados e etc.

### config

Pasta onde se localiza as configurações do sistema, por default, existe um arquivo de `config.json` onde deve-se inserir os acesso ao banco de dados no formado abaixo:

```JSON
{
    "development": {
        "database": "NOME DO BANCO DE DADOS",
        "username": "USUÁRIO DO BANCO DE DADOS",
        "password": "SENHA DO USUÁRIO",
        "host":     "localhost OU OUTRO HOST",
        "dialect":  "postgres OU mysql",
        "dummy":    "CONNECTION STRING PARA A BASE DE DADOS BURRO PARA SINCRONIZAÇÃO AUTOMATICA (apenas postgres)"
    },
    "production": {
        "connection_env": "VÁRIAVEL DE AMBIENTE DO BANCO DE DADOS PRINCIPAL DE PRODUÇÃO",
        "dialect": "postgres OU mysql",
        "dummy_env":   "VARIAVEL DE AMBIENTE DA BASE BURRA DE PRODUÇÃO"
    }
}
```

### factory

Pasta onde se localizam os arquivos de factory do sistema, geralmente são consideradas factories toda entidade que gera um caminho(Rota) ou função dentro da API.

### middlewares

Pasta onde se localizam os middlewares da aplicação. Todos os middlewares devem ser functions que retornem outras functions que são implementadas no express, exemplo abaixo:

```javascript
//middleware para liberar o cross origin
app.use(middlewares.authorization.allowCrossOriging());
```

### models

Patas onde licalizam-se os models do sistema. Entidades responsaveis por acessarem o banco de dados, são definidos seguindo a documentação do ORM [Sequelize](http://docs.sequelizejs.com/). São usadas também para definerem o dominio do sistema.

### routes

Rotas customizadas pelo desenvolvedor, onde pode-se programar utilizando dos recursos disponíveis no sistema. Elas exportam objetos Router consumiveis pelo framework Express.

### utils

Arquivos fora do escopo ou dominio, mas úteis ao sistema.

### arquivos fora das pastas

#### app.js

App exportado pelo express fornecendo um http handler para o servidor de HTTP. Aqui se registram as rotas custumizadas e middlewares globais.

#### pm2.js

Arquivo executado somente em produção para gernciamento de instâncias do sistema. Por default ele inicia 3 instâncias, mas pode ser customizavel por variáveis de ambiente.

## A API

### Respostas da API

Toda resposta gerada pela api deve seguir o padrão JSON e formatada como o exemplo abaixo:

```javascript
{
    "success": Boolean, //true caso sucesso e false caso contrário
    "message": String, // String do erro gerado, somente aparece quando success: false
    "stack": String, // Aparece somente quando success: false, stackTrace do erro gerado pelo sistema.
    "data": Object, // Resultado da operação realizada, veremos o retorno deste parâmetro a seguir
}
```

### Funções da API

A API é toda baseada nos Models do sistema, será listado a seguir quais o sistema possui e seus atributos.

#### Models

1. Aluno
```javascript
{
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    genero: DataTypes.STRING,
    identificacao: DataTypes.STRING
}
 ```

2. Curso
```javascript
{
    nome: DataTypes.STRING,
    codigo: DataTypes.STRING,
    observacoes: DataTypes.STRING,
}
 ```

3. Funcionario
```javascript
 {
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
 }
```

4. FuncionarioSessao
```javascript
{
    token: DataTypes.STRING,
    dataFechamento: DataTypes.DATE,
    dataAbertura: DataTypes.DATE,
}
```

5. Professor
```javascript
{
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    genero: DataTypes.STRING,
    identificacao: DataTypes.STRING
}
```

#### End Points

##### `POST /authenticate`
Função para realizar a criação do TOKEN de acesso para o funcionário.

```javascript
//Parâmetros de entradas:
login: STRING
senha: STRING
```

```javascript
//Parâmetros de saída
data: Object(FuncionarioSessaoModel)
```

##### `GET /rest/:ModelName?token=FUNCIONARIO_TOKEN`
Função para retornar todos os dados do modelo passado pelo parâmetro `:ModelName`. (É possivel aplicar filtros nessa função)

[SEQUELIZE QUERY](http://docs.sequelizejs.com/manual/tutorial/querying.html)

```javascript
//#URLENCODED (/rest/end/point?filter={})
//Parâmetros de entradas:
filter: Object({
    ColumnName: {
        //FILTROS IGUAIS AOS DA QUERY DO SEQUELIZE
    }
})
```

```javascript
//Parâmetros de saída
data: Object({
    count: Number,
    rows Array(ModelName)
})
```


##### `POST /rest/:ModelName?token=FUNCIONARIO_TOKEN`
Função para adicionar dados do modelo passado pelo parâmetro `:ModelName`.


```javascript
//Parâmetros de entradas:
ModelNameAttributes: Object
Ex: {
    nome: "Teste",
    sobrenome: "Test"
}
```

```javascript
//Parâmetros de saída
data: Object(ModelName)
```

##### `PUT /rest/:ModelName/:ModelId?token=FUNCIONARIO_TOKEN`
Função para atualizar dados do modelo passado pelo parâmetro `:ModelName` e referênciando o Modelo de id `ModelId`.


```javascript
//Parâmetros de entradas:
ModelNameAttributes: Object
Ex: {
    nome: "Teste",
    sobrenome: "Test"
}
```

```javascript
//Parâmetros de saída
data: Object(ModelName)
```

##### `GET /rest/:ModelName/:ModelId?token=FUNCIONARIO_TOKEN`
Função para buscar dados do modelo passado pelo parâmetro `:ModelName` e referênciando o Modelo de id `ModelId`.


```javascript
//Parâmetros de entradas:
//Nenhum parâmetro
```

```javascript
//Parâmetros de saída
data: Object(ModelName)
```


### Usuário e Senha Padrão

- Login: admin
- Senha: admin
