# Backend The Boys 🦸‍♂️

[![Capa do Projeto](https://m.media-amazon.com/images/S/pv-target-images/473fd8bc878799c1a035cb13c688edd9eb6d240d426abf34e0bf3c1dde95724b.jpg)](https://github.com/caiquenaimi/Backend-The-Boys)

Este é o repositório de um projeto completo que envolve o desenvolvimento de uma API do universo da série The Boys. O projeto, construído utilizando tecnologias avançadas como Express.js, PostgreSQL e Node.js, tem como propósito fornecer aos fãs um guia interativo e informativo que cubra todos os aspectos do Super Mundo de The Boys. Este guia oferece detalhes abrangentes sobre os personagens da série, explorando suas origens, habilidades e batalhas entre personagens.

## Visão Geral 
Este é um projeto simples de backend desenvolvido com Express.js e PostgreSQL. Ele fornece uma API para gerenciar informações de herois incluindo id, nome, poderes, força, nível, vida e contador de vitórias. E batalhas incluindo id, hero1_id, hero2_id, winner_id, loser_id suas chaves estrangeiras.

## Pré-requisitos 

Certifique-se de ter o Node.js e o npm instalados em seu sistema. Além disso, é necessário ter o PostgreSQL instalado e em execução em sua máquina.

## Configuração do Projeto ⚙

1. **Clonar o repositório:**
```
git clone https://github.com/caiquenaimi/Backend-The-Boys.git
```
2. **Instalar dependências:**
```
npm install
```
3. **Instalar bibliotecas externas:**
```
npm install express nodemon pg
```
4. **Configurar o banco de dados:** 
- Crie um banco de dados PostgreSQL com o nome 'theboys':
  ```
  CREATE DATABASE theboys;
  ```
- Ajuste as credenciais do banco de dados no arquivo `index.js`, se necessário.

## Arquitetura de Pastas 📂

O projeto segue uma arquitetura de pastas comum para aplicações Node.js, onde os arquivos relacionados ao código-fonte estão localizados dentro do diretório `src`. Dentro do diretório `src`, você encontrará:

- `controllers`: Contém os controladores da aplicação, responsáveis por definir a lógica de negócios e manipular as requisições HTTP.
- `routes`: Contém os arquivos de roteamento da aplicação, onde as rotas da API são definidas e configuradas.
- `db`: Contém os scripts e configurações relacionados ao banco de dados, como migrações, seeds e configuração de conexão.
- `config`: Contém arquivos de configuração da aplicação, como configurações de banco de dados ou variáveis de ambiente.
- `index.js`: O ponto de entrada da aplicação, onde o servidor Express é configurado e inicializado.

## Inicializando o Servidor 🔛

Para iniciar o servidor Express, execute o seguinte comando:
```
npm run dev
```
O servidor será iniciado na porta 3000 por padrão.

## Rotas Disponíveis 🚀

### Herois

<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <img src="https://rollingstone.uol.com.br/media/_versions/the-boys-membros-sete-reproducao_widelg.jpg" alt="Herois">
</div>


- **GET /heroes:** Retorna todos os herois cadastrados.
- **GET /heroes/:id:** Retorna um heroes específico com base no ID fornecido.
- **GET /heroes/name/:name:** Filtra os herois pelo nome fornecido.
- **POST /heroes:** Adiciona um novo heroi.
- **PUT /heroes/:id:** Atualiza as informações de um heroi existente.
- **DELETE /heroes/:id:** Exclui um heroi com base no ID fornecido.

### Batalhas

<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <img src="https://sm.ign.com/ign_br/feature/t/the-boys-s/the-boys-season-4-trailer-fights-for-the-soul-of-america_crcx.jpg" alt="Batalhas">
</div>


- **GET /battles:** Retorna o histórico de batalhas.
- **POST /battles:** Realiza uma batalha entre dois herois utilzando seus IDs.

## Testando as Rotas 

Você pode usar ferramentas como Postman ou simplesmente acessar as rotas no navegador ou em qualquer cliente HTTP para testar as funcionalidades.

## Créditos 

Este projeto foi desenvolvido como parte de um exercício prático para praticar o uso do Express.js e PostgreSQL.

## Contribuindo ⚡

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Desenvolvido por [Caique Naimi](https://github.com/caiquenaimi)
