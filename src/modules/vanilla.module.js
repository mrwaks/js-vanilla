"use strict";

// Core Modules
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { EOL } from "os";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Npm Modules
import inquirer from "inquirer";

// Modules
import folderQuestionWithoutDuplicates from "./folder-question-without-duplicate.module.js";

// Config
import questions from "../config/inquirer/questions.config.js";

// Utils
import constants from "../utils/constants.util.js";
import boxen from "boxen";

// Data
const data = require("../data/vanilla/vanilla.json");

const vanilla = async () => {
    const answer = await inquirer.prompt(await folderQuestionWithoutDuplicates());
    const folderName = answer.folderName;

    if (existsSync(folderName)) {
        console.error(new Error(`'${folderName}' folder ${constants.errors.EEXIST}`).message);
        return vanilla();
    }

    const answers = await inquirer.prompt(questions);
    const files = {
        html: `${answers.html}.html`,
        css: `${answers.css}.css`,
        js: `${answers.js}.js`,
    };
    
    const HTMLProcess = data.html.replace(/(?<=href=").*(?=")/, files.css).replace(/(?<=src=").*(?=")/, files.js);
    
    await mkdir(folderName);
    await writeFile(join(folderName, files.html), HTMLProcess);
    await writeFile(join(folderName, files.css), data.css);
    await writeFile(join(folderName, files.js), data.js);
    finalMessage(folderName, files.html, files.css, files.js);
    return folderName;
};

function finalMessage(folderName, htmlFileName, cssFileName, jsFileName) {
    console.log(`${EOL}${boxen(`\x1b[33mCongratulations ! 🥳 Your vanilla template \x1b[1m${folderName.toUpperCase()}\x1b[0;33m has been created successfully ! 🚀\x1b[0m`, {
        borderStyle: 'double',
        borderColor: 'greenBright',
        padding: 1,
    })}`);

    console.log(`\x1b[32;3;4m${EOL}Your template \x1b[1m${folderName.toUpperCase()}\x1b[0;32;3;4m includes:\x1b[0m`);
    console.log(`\x1b[36m${EOL}- \x1b[1m${htmlFileName}\x1b[0;36m file.\x1b[0m`);
    console.log(`\x1b[36m- \x1b[1m${cssFileName}\x1b[0;36m file.\x1b[0m`);
    console.log(`\x1b[36m- \x1b[1m${jsFileName}\x1b[0;36m file.\x1b[0m`);
    console.log(`\x1b[35m${EOL}* \x1b[1m'<link>'\x1b[0;35m tag was linked to \x1b[1m${cssFileName}\x1b[0;35m in the \x1b[1m${htmlFileName}\x1b[0;35m file.\x1b[0m`);
    console.log(`\x1b[35m* \x1b[1m'<script></script>'\x1b[0;35m tag was linked to \x1b[1m${jsFileName}\x1b[0;35m in the \x1b[1m${htmlFileName}\x1b[0;35m file.\x1b[0m`);
    console.log(`\x1b[33m${EOL}Good tasting, don't forget to take a spoon and a napkin 🥄 🍦 😋${EOL}\x1b[0m`);
};

export default vanilla;