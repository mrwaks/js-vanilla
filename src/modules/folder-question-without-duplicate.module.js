"use strict";

// Core Modules
import { readdir } from "fs/promises";

const folderQuestionWithoutDuplicates = async () => {
    const currentDir = await readdir(".");
    const vanillaFiles = currentDir.filter(file => /^vanilla-\d+$/.test(file));

    if (vanillaFiles.length == 0) {
        return {
            prefix: "vanilla-cone -",
            type: "input",
            name: "folderName",
            message: "folder name:",
            default: "vanilla-1",
        }
    }

    const sufixNumbers = vanillaFiles.map(file => /\d+$/.test(file) ? +file.match(/\d+$/) : "").flat();
    const maxNumber = Math.max(...sufixNumbers);
    const result = `vanilla-${maxNumber + 1}`;
    
    return {
        prefix: "vanilla-cone -",
        type: "input",
        name: "folderName",
        message: "folder name:",
        default: result,
    }
};

export default folderQuestionWithoutDuplicates;