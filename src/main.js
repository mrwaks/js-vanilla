#!/usr/bin/env node

"use strict";

// Modules
import vanilla from "./modules/vanilla.module.js";
import vanillaOption_y from "./modules/vanilla-option-y.module.js";

// Utils
import { code } from "./utils/exec.util.js";
import constants from "./utils/constants.util.js";

const cli = ( async ([, , ...args] = process.argv) => {
    if (args.length == 0) {
        return await vanilla();
    }
    if (args.length == 1) {
        if (/^-c$|^--code$/.test(args[0])) {
            const folderName = await vanilla();
            return code(folderName);
        }
        if (/^-y$|^--yes$/.test(args[0])) {
            return await vanillaOption_y();
        }
        if (/^-v$|^--version$/.test(args[0])) {
            return constants.version();
        }
        if (/^-h$|^--help$/.test(args[0])) {
            return constants.help();
        }
    }
    if (args.length == 2) {
        if (/^-y$|^--yes$|^-c$|^--code$/.test(args[0] || /^-y$|^--yes$|^-c$|^--code$/.test(args[1]))) {
            const folderName = await vanillaOption_y();
            return code(folderName);
        }
    }
})();