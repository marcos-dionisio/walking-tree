<img align="center" src="https://i.imgur.com/R3xKqd2.png">

<p align="center">
  <a href="https://npm-stat.com/charts.html?package=walking-tree">
    <img src="https://img.shields.io/npm/dm/walking-tree.svg">
  </a>
  <a href="https://www.npmjs.com/package/walking-tree">
    <img src="https://badge.fury.io/js/walking-tree.svg">
  </a>
  <a href="https://snyk.io/test/github/marcos-dionisio/walking-tree">
    <img src="https://snyk.io/test/github/marcos-dionisio/walking-tree/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/marcos-dionisio/walking-tree" style="max-width:100%;">
  </a>
</p>

<h1 align="center">Walking Tree</h1>
<p align="center">Simples módulo para pegar toda árvore de arquivos de uma pasta</p>

# Instalar

```bash
npm i walking-tree
```
```bash
yarn add walking-tree
```

# Como usar

A sintaxe para usar o módulo é simples, use: `walkingTree(path)`\
Também você pode usar com as opções personalizadas: `walkingTree(path, [options])`

Você pode usar com uma simples variável:
```js
const walkingTree = require("walking-tree");
const files = walkingTree("./local/");

console.log(files);
```

# Opções

`filter` : `RegExp` - Filtre todos os arquivos pelo nome usando Regex \
`details` : `Boolean` - Veja todos os arquivos de forma mais detalhada em um objeto dentro do array \
`folders` : `Boolean` - Retorna não somente os arquivos, mas também as pastas

# Resultado

O resultado da execução retorna um array com todos os caminhos dos arquivos:
```js
[
  '.../local/notes.txt',
  '.../local/utilites/codes/bar.js',
  '.../local/utilites/codes/baz.js',
  '.../local/utilites/codes/foo.js',
  '.../local/utilites/images/bird.png',
  '.../local/utilites/images/cat.png',
  '.../local/utilites/videos/bird-meme.mp4'
]
```

# Versão do Node

A versão compatível com este módulo do Node é a 4 ou uma maior!

# Traduções

[Inglês](readme.md) \
[Português](pt-br.md)

# Autor

| [<img src="https://avatars.githubusercontent.com/u/74318296?v=4&s=115"><br><sub>Marcos Dionisio</sub>](https://github.com/marcos-dionisio) |
| :---: |