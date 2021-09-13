'use strict';

import boxen from 'boxen';
import colors from 'colors';
import { EOL } from 'os';

export const finalMessage = (folderName) => {

    console.log(EOL + boxen(`Congratulations ! 🥳 Your ${folderName.toUpperCase().bold} template has been created successfully ! 🚀`.yellow, {
        borderStyle: 'double',
        borderColor: 'greenBright',
        padding: 1
    }));
    console.log((`${EOL}Your ${folderName.toUpperCase().bold} template includes:`.green.italic.underline));
    console.log(`${EOL}- A ${'index.html'.bold} file.`.cyan);
    console.log(`- A ${'styles.css'.bold} file.`.cyan);
    console.log(`- A ${'main.js'.bold} file.`.cyan);
    console.log(`${EOL}* A ${'<link>'.bold} tag was linked to styles.css in the index.html file.`.magenta);
    console.log(`* A ${'<script></script>'.bold} tag was linked to main.js in the index.html file.`.magenta);
    console.log(`${EOL}js-vanilla wishes you good luck in the development of your website ! 🤩 ❤️\n`.bold.yellow);
}

export const finalMessageCustom = (folderName, htmlName, cssName, jsName) => {

    console.log('\n' + boxen(`Congratulations ! 🥳 Your vanilla template ${folderName.toUpperCase().bold} has been created successfully ! 🚀`.yellow, {
        borderStyle: 'double',
        borderColor: 'greenBright',
        padding: 1
    }));
    console.log(`${EOL}Your template ${folderName.toUpperCase().bold} includes:`.green.italic.underline);
    console.log(`${EOL}- A ${htmlName.bold}${'.html'.bold} file.`.cyan);
    console.log(`- A ${cssName.bold}${'.css'.bold} file.`.cyan);
    console.log(`- A ${jsName.bold}${'.js'.bold} file.`.cyan);
    console.log(`${EOL}* A ${'<link>'.bold} tag was linked to ${cssName.bold}${'.css'.bold} in the ${htmlName.bold}${'.html'.bold} file.`.magenta);
    console.log(`* A ${'<script></script>'.bold} tag was linked to ${jsName.bold}${'.js'.bold} in the ${htmlName.bold}${'.html'.bold} file.`.magenta);
    console.log(`${EOL}The webstatic team wishes you good luck in the development of your website ! 🤩 ❤️\n`.bold.yellow);
}