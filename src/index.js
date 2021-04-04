"use strict"

const path = require("path");
const fs = require("fs");

/**
 * Takes all files from the directory
 * @param {String} path
 * @param {Object} [optional] options
 * @return {Array}
 */
function walkingTree(fileWay, options) {
    const resolvedWay = path.resolve(fileWay);
    const files = getFiles(resolvedWay);
    const filesTree = new Array();

    for (const file of files) {
        pushFiles(file, filesTree, options);
    }

    return filesTree;
}

/**
 * Get all files in directory path
 * @param {String} path
 * @return {Array}
 */
function getFiles(fileWay) {
    const files = fs.readdirSync(fileWay);
    const newFiles = new Array();

    for (const name of files) {
        const file = (fileWay + "/" + name);
        const isDir = fs.lstatSync(file).isDirectory();

        newFiles.push({
            name: name,
            isDir: isDir,
            path: file
        })
    }

    return newFiles;
}

/**
 * Push all files in directory to array
 * @param {Object} file
 * @param {Array} filesTree
 * @param {Object} options
 */
function pushFiles(file, filesTree, options) {
    let enableFolders = file.isDir;
    let details = false;
    
    if (file.isDir) {
        const files = getFiles(file.path);
        
        for (const file of files) {
            pushFiles(file, filesTree, options)
        }
    }
    if (options) {
        if (options.hasOwnProperty("filter")) {
            if (!options.filter.test(file.name)) return;
        }
        if (options.hasOwnProperty("details")) {
            if (options.details) details = options.details;
        }
        if (options.hasOwnProperty("folders")) {
            if (options.folders) enableFolders = false;
        }
    }
    if (!details) file = file.path;
    if (!enableFolders) filesTree.push(file);
}

// Exporting module
module.exports = walkingTree;