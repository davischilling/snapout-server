# Criar projeto simples

**Inicia projeto node**
npm init -y

**Configura o TypeScript**
npm i -D typescript @types/node

**Cria arquivo de configuração do typescript (tsconfig.json) sem que esteja globalmente instalado**
npx tsc --init

## Copia arquivo tsconfig do outro projeto

**Inicia a aplicação - script**
"start": "node -r dotenv/config dist/main"

**Define qual a versão do node será utilizada**
"engines": {
    "node": "16.x"
},

**Instalar rimraf**
npm i rimraf

**Build do codigo TypeScript em JavaScript com Rimraf - script**
"build": "rimraf dist && tsc"

**instalações**
npm i cors express mongoose
npm i -D ts-node-dev dotenv @types/cors @types/express @types/mongoose

**script**
"dev": "ts-node-dev --respawn --transpile-only --clear -r dotenv/config --inspect=0.0.0.0:9229 src"

## copiar do outro projeto as pastas e arquivos

> src
  > config
    - app
    - env
    - routes
    - middlewares
  > routes
    - testar sua rota
  > models - criar

- index
