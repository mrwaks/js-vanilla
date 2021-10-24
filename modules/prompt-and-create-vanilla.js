'use strict';

import colors from 'colors';
import prompt from 'prompt';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { finalMessageCustom } from './final-message.js';
import { EOL } from 'os';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const schemaFile = require('../data-json/schemaFile.json');

const vanilla = require('../data-json/vanilla.json');
const dataHTML = vanilla.html.split('\n');
const dataJS = vanilla.js;
const dataCSS = vanilla.css;

let dataProcessed = [];
let index;

prompt.message = 'js-vanilla';

prompt.start();

export function promptAndCreateVanilla(schemaFolder, recursiveFunction) {
    prompt.get(schemaFolder, (err, res) => {
        if (err) throw err;

        if (existsSync(`${res.folder}`)) {
            console.log(`A ${res.folder.bold} folder already exist at this location. Please choose another name.`.red);
            recursiveFunction();
        } else {
            const resFolder = () => {
                return res.folder;
            }
            prompt.get(schemaFile, (err, res) => {
                if (err) throw err;

                mkdirSync(`${resFolder()}`);

                for (let i in dataHTML) {
                    if (dataHTML[i].match(/(?<=href=")[ \w\S\s]*(?=")/g)) {
                        index = i;
                        dataProcessed.push(dataHTML[i]);
                    }
                }
                let newCssLink = dataProcessed.join('').replace(/(?<=href=")[ \w\S\s]*(?=")/g, `${res.css}.css`);

                dataHTML.splice(index, 1, newCssLink);
                dataProcessed.pop();

                for (let i in dataHTML) {
                    if (dataHTML[i].match(/(?<=src=")[ \w\S\s]*(?=")/g)) {
                        index = i;
                        dataProcessed.push(dataHTML[i]);
                    }
                }

                let newJsScript = dataProcessed.join('').replace(/(?<=src=")[ \w\S\s]*(?=")/g, `${res.js}.js`);
                dataHTML.splice(index, 1, newJsScript);
                dataProcessed.pop();

                writeFileSync(`./${resFolder()}/${res.html}.html`, dataHTML.join('\n'));
                writeFileSync(`./${resFolder()}/${res.css}.css`, dataCSS);
                writeFileSync(`./${resFolder()}/${res.js}.js`, dataJS);

                finalMessageCustom(`${resFolder()}`, res.html, res.css, res.js);
            })
        }
    })
}