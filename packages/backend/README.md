# Backend

Esse é o serviço responsável para gerir informações do banco de dados e se conectar com o microserviço de corrections

### Executando o app

Para o serviço funcionar corretamente é necessário ter o serviço [corrections](packages/corrections) já inicializado.

```bash
# installation
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Testando o app

```bash
# Run all tests
$ npm run test

# Run all tests coverage
$ npm run test:cov

# Run e2e test
$ npm run test:e2e
```