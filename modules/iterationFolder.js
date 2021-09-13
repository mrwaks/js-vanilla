'use strict';

import {
    mkdirSync,
    existsSync,
    readFileSync,
    readdirSync
} from 'fs';

// let schemaFolder = readFileSync('../data-json/schemaFolder.json', 'utf-8');

export function iterationFolder(schemaFolder) {
    if (!existsSync('vanilla-1')) {
        return 'vanilla-1';
    } else {
        let currentFile = readdirSync('.', 'utf-8');
        let numbersFile = [];
        for (let i in currentFile) {
            if ((/ *vanilla-\d* */g).test(currentFile[i])) {
                numbersFile.push(currentFile[i].match(/\d+/));
            }
        }
        let bigInt = Math.max(...numbersFile);
        let newFileName = `vanilla-${bigInt += 1}`;
        if ((/(?<="default": ")[\w\S\d]+(?=")/).test(schemaFolder)) {
            schemaFolder = schemaFolder.replace(/(?<="default": ")[\w\S\d]+(?=")/, newFileName);
            return schemaFolder;
        } else {
            console.log('pas ok');
        }
    }
};

// console.log(iterationFolder());