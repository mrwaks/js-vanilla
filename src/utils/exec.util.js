"use strict";

// Core Modules
import { exec } from "child_process";

export const code = (folderName) => {
    return exec(`code ${folderName}`, (err) => {
        if (err) throw new Error("\x1b[33mPlease install 'code' cli from vscode: https://code.visualstudio.com/docs/editor/command-line\x1b[0m");
    });
};