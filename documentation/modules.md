# Descrição dos modulos instalados no projeto

## Produção

> **Apaga a pasta dist antes de buildar**
npm i rimraf
> **Serve para configurar os imports utilizando o alias @/**
npm i module-alias
npm i -D @types/module-alias

## Desenvolvimento

> **Configura o TypeScript**
npm i -D typescript @types/node
> **Configura o Eslint para o projeto**
npm install --save-dev eslint@7 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin@4 eslint-config-standard-with-typescript
> **Biblioteca de tests**
npm i -D jest @types/jest ts-jest
> **Biblioteca para rodar scripts somente em arquivos modificados**
npm i -D lint-staged
> **Executa scripts na hora do commit**
npm i -D husky
