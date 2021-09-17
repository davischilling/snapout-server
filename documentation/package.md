# Configurações realizadas no package.json

**Inicia a aplicação - script**
"start": "node dist/main/api",

**Define qual a versão do node será utilizada**
"engines": {
    "node": "16.x"
},

**Build do codigo TypeScript em JavaScript - script**
"build": "tsc"
**Build do codigo TypeScript em JavaScript com Rimraf - script**
"build": "rimraf dist && tsc"
**Aponta o build para o arquivo tsconfig-build.json - script**
"build": "rimraf dist && tsc -p tsconfig-build.json"

**Roda as verificações do Eslint**
"lint": "eslint ."
**Aplica as correções do eslint do Eslint**
"lint:fix": "npm run lint -- --fix"

**Roda os testes**
"test": "jest --passWithNoTests --no-cache --runInBand",
**Roda os testes com watch**
"test:watch": "npm run test -- --watch"
**Roda os testes com coverage**
"test:coverage": "npm run test -- --coverage"
**Roda os testes somente em arquivos modificados**
"test:staged": "npm run test -- --findRelatedTests",
