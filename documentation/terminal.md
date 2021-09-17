# Curso NodeJs Avançado com TDD, Clean Architecture e Typescript

## repositorio -> <https://github.com/rmanguinho/advanced-node>

**Inicia projeto node**
npm init -y

**Cria arquivo de configuração do typescript (tsconfig.json) sem que esteja globalmente instalado**
npx tsc --init

**Fazer build do codigo TypeScript para JavaScript**
npx tsc

**Cria arquivo de configuração do jest**
npx jest --init
  yes
  no
  node
  yes
  babel
  no

**Configura o husky pra usar o lint-staged**
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/pre-push "npm run test:coverage"
