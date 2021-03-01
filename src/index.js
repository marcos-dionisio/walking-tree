"use strict"

const fs = require("fs");

function walkingTree() {

	function get(path, callback) {
		const filesPath = new Array();
		const files = getFiles(path);
		let index = new Number();

		forInCode(index, {
			execute: setFilesInArray.bind(null, filesPath),
			array: files
		})

		return callbackMethod(callback, filesPath);
	}

	function getFiles(path) {
		const files = fs.readdirSync(path);
		const filesObj = new Array();

		if (!files) return filesObj;
		
		for (const index in files) {
			const fileWay = (path + files[index]);
			const dirWay = (path + files[index] + "/");
			const isDir = fs.lstatSync(fileWay).isDirectory();

			filesObj.push({
				way: (isDir ? dirWay : fileWay),
				isDir: isDir
			})
		}

		return filesObj;
	}

	function setFilesInArray(array, file) {
		if (!file) return;
		if (file.isDir) return getMoreFiles(file.way, array);

		return array.push(file.way);
	}
	
	function getMoreFiles(path, array) {
		const files = getFiles(path);
		let index = new Number();

		return forInCode(index, {
			execute: setFilesInArray.bind(null, array),
			array: files
		})
	}

	function forInCode(index, options) {
		options.execute.bind(null, options.array[index])();
		if (index < (options.array.length - 1)) {
			index++
			return forInCode(index, options);
		}
	}

	function callbackMethod(callback, files) {
		return (callback ? callback.bind(null, files)() : files);
	}

	return {
		get
	}
}

module.exports = walkingTree();