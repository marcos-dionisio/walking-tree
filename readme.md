<img align="center" src="https://i.imgur.com/R3xKqd2.png">

<p align="center">
  <a href="https://npm-stat.com/charts.html?package=walking-tree">
    <img src="https://img.shields.io/npm/dm/walking-tree.svg">
  </a>
  <a href="https://www.npmjs.com/package/walking-tree">
    <img src="https://badge.fury.io/js/walking-tree.svg">
  </a>
</p>

<h1 align="center">Walking Tree</h1>

<p align="center">Simple package to get the files path of a directory in an array</p>

# Usage

You can use it with a simple constant:
```
const walkingTree = require("files-tree");
const files = walkingTree.get("./local/");

console.log(files);
```
Or also use with callback function:
```
const walkingTree = require("files-tree");

walkingTree.get("./local/", (files) => {
	console.log(files);
})
```

# Result

The result of the execution returns an array with the path of all files
```
[
  './local/notes.txt',
  './local/utilites/codes/bar.js',
  './local/utilites/codes/baz.js',
  './local/utilites/codes/foo.js',
  './local/utilites/images/bird.png',
  './local/utilites/images/cat.png',
  './local/utilites/videos/bird-meme.mp4'
]
```

# Node version

The version most compatible with our package is node 4.2 or higher!

# Author


| [<img src="https://avatars.githubusercontent.com/u/74318296?v=4&s=115"><br><sub>Marcos Dionisio</sub>](https://github.com/marcos-dionisio) |
| :---: |