"use strict"

const nodePath = require("path");
const fs = require("fs");

/** Main execution function */
function walkingTree() {

    /**
	 * Get method of callback, callback or simple return
	 * @param {Function} callback [optional]
	 * @param {Array} files
	 */
	const callbackMethod = (callback, files) => (callback ? callback.bind(null, files)() : files);

	/**
	 * Takes all files from the directory
	 * @param {String} path
	 * @param {Object} [optional] options
	 * @param {Function} [options] callback
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
		    const fileName = files[index];
			const filePath = nodePath.resolve(path + files[index]);
			const isDir = fs.lstatSync(filePath).isDirectory();
            const finalPath = (isDir ? (filePath + "/") : filePath);

			filesObj.push({
			    name: fileName,
			    isDir: isDir,
				path: finalPath
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
		
		const config = configuration(options, file);
		
		if (file.isDir) {
		    if (config.folders && config.valid) {
		        filesPath.push(config.value);
		    }
			return getMoreFiles(options, file.path, filesPath);
		}
		if (config.valid) {
			return filesPath.push(config.value);
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
	 * Set all configurations of the options
	 * @param {Object} optionsObj
	 * @param {Array} filesPath
	 */
	function configuration(options, file) {
	    const config = {
	        valid: true,
	        folders: false,
	        value: file.path
	    }
	    
		if (!options) return config;
		if (options.hasOwnProperty("filter")) {
			config.valid = options.filter.test(file.name);
		}
		if (options.hasOwnProperty("details")) {
		    
		    // I used conditional ternary operator to verify
            options.details ? (config.value = file) : (config.value = file.path);
		}
		if (options.hasOwnProperty("folders")) {
		    config.folders = options.folders;
		}

		return config;
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

	return {
		get
	}
}

// Exporting module
module.exports = walkingTree();