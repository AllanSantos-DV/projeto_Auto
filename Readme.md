# 🚗 AutoMóveis 🚗

## Instalação

1. Clone o repositório.
2. Execute o comando `npm install` para instalar as dependências.
3. Crie o database no seu banco de dados.
4. Renomeie o arquivo `.env_example` para `.env`.
5. Configure o arquivo `.env` com as informações do seu banco de dados e servidor.

    Exemplo:
    ```java.
    # banco de dados
    DB_USER= #usuário do banco de dados
    DB_PASSWORD= #senha do banco de dados
    DB_NAME= #nome do banco de dados
    DB_HOST= #host do banco de dados
    DB_DIALECT= #dialect do banco de dados

    # servidor
    PORT= #porta do servidor

    # secret
    SESSION_SECRET= #Configure seu segredo aqui

    # ambiente
    NODE_ENV= #development (Se estiver rodando em Local manter development)
    ```

## Uso

Utilize `npm start` para iniciar a aplicação.

Acesse a aplicação através da rota: [http://localhost:3000/pessoas](http://localhost:3000/pessoas)

Nota: O link da rota do app sera apresentada no console apos iniciar o projeto. O exemplo acima sujere que vc estara usando a porta 3000.

## Funcionamento do App

O aplicativo AutoMóveis permite a criação e gerenciamento de pessoas e carros. A relação entre eles é definida da seguinte forma: uma pessoa pode ter vários carros, mas um carro só pode pertencer a uma única pessoa. É possível editar os dados tanto das pessoas quanto dos carros.

### Criação de Pessoas e Carros

Para criar uma pessoa, você pode utilizar a rota `/pessoas` e enviar os dados necessários, como nome, idade. A pessoa será adicionada ao banco de dados e receberá um ID único.

Da mesma forma, para criar um carro, você pode utilizar a rota `/carros` e enviar os dados necessários, como marca, modelo, ano, etc. O carro também será adicionado ao banco de dados e receberá um ID único.

### Edição de Dados

Para editar os dados de uma pessoa ou de um carro, você pode utilizar os botões de editar em pessoas e clicar nos cards dos carros respectivamente. Envie os novos dados que deseja atualizar e o aplicativo irá atualizar as informações no banco de dados.

### Exclusão de Pessoas e Carros

Quando uma pessoa é excluída, apenas a pessoa em si é removida do banco de dados. Os carros associados a essa pessoa permanecem intactos.

Da mesma forma, quando um carro é excluído, apenas o carro em si é removido do banco de dados. A pessoa associada a esse carro permanece intacta.

### Telas de Visualização

O aplicativo possui duas telas principais: uma que mostra todas as pessoas cadastradas e outra que mostra todos os carros cadastrados. Você pode acessar essas telas através das rotas `/pessoas` e `/carros`, respectivamente.

Essas são as principais funcionalidades do aplicativo AutoMóveis. Se tiver alguma dúvida adicional, fique à vontade para perguntar.

## Contribuição

Explique como os outros podem contribuir para o seu projeto. Forneça orientações sobre como enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.

## Contato

**Email:** [allannascimentodossantos@gmail.com](mailto:allannascimentodossantos@gmail.com)

