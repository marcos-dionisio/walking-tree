const walkingTree = require("../../src/index.js");

walkingTree.get("./", (files) => {
	console.log(files);
})