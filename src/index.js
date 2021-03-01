"use strict"

const fs = require("fs");

/**
 * Main execution function
 * @return {Object}
 */
function walkingTree() {

	/**
	 * Takes all files from the directory
	 * @@param {String} path
	 * @@param {function} callback [optional]
	 * @return {Array}
	 */
	function get(path, callback) {
		const filesPath = new Array();
		const files = getFiles(path);
		let index = new Number();

		// Execute for loop in function, executing setFilesInArray
		forInCode(index, {
			execute: setFilesInArray.bind(null, filesPath),
			array: files
		})

		return callbackMethod(callback, filesPath);
	}

	/**
	 * Get all files in directory path
	 * @@param {String} path
	 * @return {Array}
	 */
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

	/**
	 * Push all files in directory to array
	 * @param {Array} array
	 * @param {Object} file
	 * @return {undefined}
   	 */
	function setFilesInArray(array, file) {
		if (!file) return;
		if (file.isDir) return getMoreFiles(file.way, array);

		return array.push(file.way);
	}
	
	/**
	 * This is an extension of the getFile Is Array function to open sub directories infinitely.
	 * @param {String} path
	 * @param {Array} array
	 * @return {function}
	 */
	function getMoreFiles(path, array) {
		const files = getFiles(path);
		let index = new Number();

		// Execute new for loop in function, executiong setFilesInArray
		return forInCode(index, {
			execute: setFilesInArray.bind(null, array),
			array: files
		})
	}

	/**
	 * A for loop made on a function
	 * that checks the quantity of an array and performs a function
	 * @param {Number} index
	 * @param {Object} options
	 * @return {undrfined}
	 */
	function forInCode(index, options) {
		options.execute.bind(null, options.array[index])();
		if (index < (options.array.length - 1)) {
			index++
			return forInCode(index, options);
		}
	}

	/**
	 * Get method of callback, callback or simple return
	 * @param {function} callback
	 * @param {Array} files
	 * @return {callback}
	*/
	function callbackMethod(callback, files) {
		return (callback ? callback.bind(null, files)() : files);
	}

	return {
		get
	}
}

// Exporting modulw
module.exports = walkingTree();