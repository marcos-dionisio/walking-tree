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
		const filesTree = new Array();
		const files = getFiles(path);
		let index = new Number();
		
		forInCode(index, {
			execute: setAllFilesInArray.bind(null, filesTree),
			array: files
		})
		
		return (callback ? callback.bind(null, filesTree)() : filesTree);
	}

	/**
	 * Get all files in directory path
	 * @@param {String} path
	 * @return {Array}
	 */
	function getFiles(path) {
		const files = fs.readdirSync(path);
		const newFiles = new Array();

		if (!files) {
			newFiles.push(undefined);
			return newFiles;
		}

		for (index in files) {
			const fileName = files[index];
			const isDirectory = fs.lstatSync(path + fileName).isDirectory();
			const fileWay = isDirectory ? (path + fileName + "/") : (path + fileName);

			newFiles.push({
				way: fileWay,
				isDirectory: isDirectory
			})
		}

		return newFiles;
	}

	/**
	 * Push all files in directory to array
	 * @param {Array} array
	 * @param {Object} file
	 * @return {undefined}
   	 */
	function setAllFilesInArray(array, file) {
		if (!file) return;
		if (file.isDirectory) {
			const files = getFiles(file.way);
			let index = new Number();

			forInCode(index, {
				execute: setAllFilesInArray.bind(null, array),
				array: files
			})
		} else {
			array.push(file.way);
		}
		
		return undefined;
	}

	/**
	 * A for loop made on a function
	 * that checks the quantity of an array and performs a function
	 * @param {Number} index
	 * @param {Object} options
	 * @return {undrfined}
	 */
	function forInCode(index, options) {
		if (options.execute) {
			options.execute.bind(null, options.array[index])();
		}
		if (index < (options.array.length - 1)) {
			index++
			forInCode(index, options);
		}

		return undefined;
	}
	
	return {
		get
	}
}


module.exports = walkingTree();