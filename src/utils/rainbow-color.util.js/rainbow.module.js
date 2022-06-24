"use strict";

// Lib
import colors from "./lib/colors.lib.js";

/** colors of the rainbow */
const rainbowColors = Object.entries(colors).map((color) => `\x1b[${color[1]}m`);

const rainbow = (str) => {
	const letters = [...str];
	let numLetters = letters.length;
	while (numLetters >= 0) {
		letters.splice(numLetters, 0, rainbowColors[numLetters % rainbowColors.length]);
		numLetters--;
	}
	letters.splice(letters.length - 1, 1, "\x1b[0m");

	return letters.join("");
};

export default rainbow;