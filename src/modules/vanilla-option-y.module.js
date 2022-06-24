"use strict";

// Core Modules
import { join } from "path";
import { mkdir, writeFile } from "fs/promises";
import { EOL } from "os";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Npm Modules
import boxen from "boxen";

// Modules
import folderQuestionWithoutDuplicates from "./folder-question-without-duplicate.module.js";

// Data
const data = require("../data/vanilla/vanilla.json");

const vanillaOption_y = async () => {
    const folderName = (await folderQuestionWithoutDuplicates()).default;
    await mkdir(folderName);
    await writeFile(join(folderName, "index.html"), data.html);
    await writeFile(join(folderName, "styles.css"), data.css);
    await writeFile(join(folderName, "main.js"), data.js);
    finalMessage(folderName);
    return folderName;
};

function finalMessage(folderName) {
    console.log(EOL + boxen((`\x1b[33mCongratulations ! 🥳 Your \x1b[1m${folderName.toUpperCase()}\x1b[0;33m template has been created successfully ! 🚀`), {
        borderStyle: 'double',
        borderColor: 'greenBright',
        padding: 1,
    }));
    console.log(`\x1b[32;3;4m${EOL}Your \x1b[1m${folderName.toUpperCase()}\x1b[0;32;3;4m template includes:\x1b[0m`);
    console.log(`\x1b[36m${EOL}- \x1b[1m${'index.html'}\x1b[0;36m file.\x1b[0m`);
    console.log(`\x1b[36m- \x1b[1m${'styles.css'}\x1b[0;36m file.\x1b[0m`);
    console.log(`\x1b[36m- \x1b[1m${'main.js'}\x1b[0;36m file.\x1b[0m`);
    console.log(`\x1b[35m${EOL}* \x1b[1m${'<link>'}\x1b[0;35m tag was linked to styles.css in the index.html file.\x1b[0m`);
    console.log(`\x1b[35m* \x1b[1m${'<script></script>'}\x1b[0;35m tag was linked to main.js in the index.html file.\x1b[0m`);
    console.log(`\x1b[33m${EOL}Good tasting, don't forget to take a spoon and a napkin 🥄 🍦 😋${EOL}`);
};

export default vanillaOption_y;