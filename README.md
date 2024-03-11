# Projeto Blogs API

# Contexto
Este foi um dos projetos realizados durante meus estudos no módulo de Back-end do curso de Desenvolvimento Web Full Stack da [Trybe](https://www.betrybe.com/formacao-desenvolvimento-web){:target="_blank"}. Desenvolvido utilizando tecnologias como Node.js, Express, Sequelize e MySQL, ele consiste na API de um blog, permitindo realizar um CRUD completo de usuários e postagens. Também foi utilizado JWT Token para garantir a autenticação de usuários e o projeto foi estruturado de acordo com os conceitos de arquitetura de software MSC.

Antes do início do desenvolvimento a Trybe forneceu aos estudantes um Diagrama de Entidade-Relacionamento para termos como base na configuração do Sequelize.

![Diagrama de Entidade-Relacionamento](/images/db.png)

>Importante: o diagrama apresentado e de propriedade da [Trybe](https://www.betrybe.com/).

## Tecnologias utilizadas

NodeJS, ExpressJS, MYSQL, ES6, Sequelize ORM, JWT, bcrypt. 

## Configurando o Projeto

### Clonando o repositório

```bash
git clone git@github.com:GabrielSartori27/blogs-api.git

cd blogs-api
```

###  Configure o arquivo .env:
* Você vai encontrar o arquivo .env.example no projeto. Mude seu nome para .env e altere as informações presentes para que correspondam as suas próprias informações.
* Estrutura do arquivo:  
```bash
#### SERVER VARS
NODE_ENV=development
API_PORT=3000

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=blogs-api
MYSQL_USER=root
MYSQL_PASSWORD=yourPassword

#### SECRECT VARS
JWT_SECRET=yourSecretPassword



```

### Rodando com Docker:
>Observação: os arquivos docker.compose.yml e Dockefile já vieram configurados pela Trybe.
* Inicie o container e instale as dependências:
```bash
docker-compose up -d
docker exec -it blogs_api bash 
npm install
```
### Rodando Localmente:
Observação: para rodar localmente é necessário ter o MySQL e o Node.js instalados em sua máquina.
* Instale as dependências:
  ```bash 
  npm install
  ``` 
## Executando aplicação

* Para criar e popular o banco de dados:
  ```
  npm run create
  npm run migrate
  npm run seed
  ``` 

* Para iniciar a aplicação:

  ```
  npm start
  ```
    

## Documentação

A documentação da API foi criada  utilizando o Swagger. Assim que a aplicação estiver rodando ela pode ser acessada pela seguinte url:  

  ```
    http://localhost:3000/api-docs/
  ```