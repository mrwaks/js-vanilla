#!/usr/bin/env node

'use strict';

import colors from 'colors';
import prompt from 'prompt';
import { finalMessage } from './modules/final-message.js';
import { promptAndCreateVanilla } from './modules/prompt-and-create-vanilla.js';
import { createRequire } from 'module';
const require = createRequire( import.meta.url );
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'fs';
import { dirname }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath( import.meta.url );
const __dirname  = dirname( __filename );

const vanilla = require('./data-json/vanilla.json');

let schemaFolderToRequire;
let schemaFolderToCustom = readFileSync(__dirname + '/data-json/schemaFolder.json', 'utf-8');
let schemaFolderCustomized;

prompt.message = 'vanilla-cone';

prompt.start();

const generateVanilla = ([, , ...args] = process.argv) => {
    if (args.length === 0) {
        if (existsSync('vanilla-1')) {
            let currentFile = readdirSync('.', 'utf-8');
            let numbersFile = [];
            for (let i in currentFile) {
                if ((/ *vanilla-\d* */g).test(currentFile[i])) {
                    numbersFile.push(currentFile[i].match(/\d+/));
                }
            }
            let bigInt = Math.max(...numbersFile);
            let fileName = `vanilla-${bigInt += 1}`;
            if ((/(?<="default": ")[\w\S\d]+(?=")/).test(schemaFolderToCustom)) {
                schemaFolderCustomized = schemaFolderToCustom.replace(/(?<="default": ")[\w\S\d]+(?=")/, fileName);
                writeFileSync(__dirname + '/data-json/schemaFolder.json', schemaFolderCustomized);
                schemaFolderToRequire = require('./data-json/schemaFolder.json');
            }
            promptAndCreateVanilla(schemaFolderToRequire, generateVanilla);

        } else {
            if ((/(?<="default": ")[\w\S\d]+(?=")/).test(schemaFolderToCustom)) {
                schemaFolderCustomized = schemaFolderToCustom.replace(/(?<="default": ")[\w\S\d]+(?=")/, 'vanilla-1');
                writeFileSync(__dirname + '/data-json/schemaFolder.json', schemaFolderCustomized);
                schemaFolderToRequire = require('./data-json/schemaFolder.json');
                promptAndCreateVanilla(schemaFolderToRequire, generateVanilla);
            }
        }
    } else if (args.length === 1 && args[0] === '-y') {
        if (!existsSync('vanilla-1')) {
            mkdirSync('vanilla-1');
            writeFileSync('./vanilla-1/index.html', vanilla.html);
            writeFileSync('./vanilla-1/styles.css', vanilla.css);
            writeFileSync('./vanilla-1/main.js', vanilla.js);
            finalMessage('vanilla-1');
        } else {
            let currentFile = readdirSync('.', 'utf-8');
            let numbersFile = [];
            for (let i in currentFile) {
                if ((/ *vanilla-\d* */g).test(currentFile[i])) {
                    numbersFile.push(currentFile[i].match(/\d+/));
                }
            }
            let bigInt = Math.max(...numbersFile);
            let folderName = `vanilla-${bigInt += 1}`;
            mkdirSync(folderName);
            writeFileSync(`./${folderName}/index.html`, vanilla.html);
            writeFileSync(`./${folderName}/styles.css`, vanilla.css);
            writeFileSync(`./${folderName}/main.js`, vanilla.js);
            finalMessage(folderName);
        }

        process.exit();
    } else {
        console.log(`webstatic: command not found: ${args.join(' ')}`.red);
    }
}

generateVanilla();