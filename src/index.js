"use strict"

const fs = require("fs");

/** Main execution function */
function walkingTree() {

	/**
	 * Takes all files from the directory
	 * @@param {String} path
	 * @@param {Function} callback [optional]
	 */
	function get() {
		const [path, options, callback] = setParams(arguments);
		const filesPath = new Array();
		const files = getFiles(path);
		let index = new Number();

		// Execute for loop in function, executing setFilesInArray
		forInCode(index, {
			execute: setFilesInArray.bind(null, options, filesPath),
			array: files
		})

		return callbackMethod(callback, filesPath);
	}

	/**
	 * Get all files in directory path
	 * @@param {String} path
	 */
	function getFiles(path) {
		const files = fs.readdirSync(path);
		const filesObj = new Array();

		if (!files) return filesObj;
		
		for (const index in files) {
			const filePath = (path + files[index]);
			const dirPath = (path + files[index] + "/");
			const isDir = fs.lstatSync(filePath).isDirectory();

			filesObj.push({
				path: (isDir ? dirPath : filePath),
				isDir: isDir
			})
		}

		return filesObj;
	}

	/**
	 * Push all files in directory to array
	 * @options {Object} options
	 * @param {Array} filesPath
	 * @param {Object} file
   	 */
	function setFilesInArray(options, filesPath, file) {
		if (!file) return;
		if (file.isDir) {
			return getMoreFiles(options, file.path, filesPath);
		}
		if (validate(options, file)) {
			return filesPath.push(file.path);
		}
	}
	
	/**
	 * This is an extension of the getFile Is Array function to open sub directories infinitely
	 * @param {Object} options
	 * @param {String} path
	 * @param {Array} filesPath
	 */
	function getMoreFiles(options, path, filesPath) {
		const files = getFiles(path);
		let index = new Number();

		// Execute new for loop in function, executiong setFilesInArray
		return forInCode(index, {
			execute: setFilesInArray.bind(null, options, filesPath),
			array: files
		})
	}
	
	/**
	 * Remove not valid options in array
	 * @param {Object} optionsObj
	 * @param {Array} filesPath
	 */
	function validate(options, file) {
		if (!options) return true;
		if (options.filter) {
			return options.filter.test(file.path);
		}
		
		return true;
	}

	/**
	 * A for loop made on a function
	 * that checks the quantity of an array and performs a function
	 * @param {Number} index
	 * @param {Object} options
	 */
	function forInCode(index, options) {
		options.execute.bind(null, options.array[index])();
		if (index < (options.array.length - 1)) {
			index++
			return forInCode(index, options);
		}
	}

	/**
	 * Set parans of get function
	 * @param {Arguments}
	 */
	function setParams(args) {
		const path = args[0];
		
		// I used conditional ternary operator to verify
		const options = (typeof args[1] !== "object") ? undefined : args[1];
		const callback = (typeof args[1] == "function") ? args[1] : args[2];
	
		return [path, options, callback];
	}

	/**
	 * Get method of callback, callback or simple return
	 * @param {Function} callback [optional]
	 * @param {Array} files
	 */
	const callbackMethod = (callback, files) => (callback ? callback.bind(null, files)() : files);

	return {
		get
	}
}

// Exporting module
module.exports = walkingTree();