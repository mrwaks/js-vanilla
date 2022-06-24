"use strict";

// Core Modules
import { EOL } from "os";

// Npm Modules
import figlet from "figlet";

// Utils
import rainbow from "../utils/rainbow-color.util.js/rainbow.module.js";

const constants = {
    path: {
        ROOTDIR: process.cwd(),
    },
    errors: {
        EEXIST: "is already exist",
    },
    help: () => {
        // Title
        const title = `\x1b[4mVanilla-cone help:\x1b[0m${EOL.repeat(2)}`;
        // Usage
        const usage = `Usage: vanilla [OPTIONS]${EOL.repeat(2)}`;
        // Options
        const yes = "-y, --yes        Create a template by default";
        const code = "-c, --code       Open template with vscode (Make sure you have the vscode cli 'code')";
        const version = "-v, --version    Display version information";
        // Bind Options
        const options = `Options:${EOL}      ${yes}${EOL}      ${code}${EOL}      ${version}`;
        // Logger
        console.log(`${title}${usage}${options}`);
    },
    version: () => {
        figlet("vanilla-cone", (err, res) => {
            if (err) {
                console.log("V1.0.9");
                return;
            }
            // Logo
            const logo = `\x1b[1m${rainbow(res)}\x1b[0m`;
            // Version
            const version = "Version: 1.0.9";
            // Informations
            const github = "Github: https://github.com/mrwaks/vanilla-cone";
            const goodIceCream = "Good Ice Cream: https://www.youtube.com/watch?v=LnqS6BnskIE";
            // Logger
            console.log(`${logo}${EOL}  ${version}${EOL}  ${github}${EOL}  ${goodIceCream}${EOL}`);
        });
    },
};

export default constants;