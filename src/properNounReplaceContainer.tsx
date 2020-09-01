import React from 'react';
import ProperNounReplace from './properNounReplace';
import { ospd } from './ospd'; // Official Scrabble Player's Dictionary
import _ from 'lodash';

const properNounReplaceContainer = () => {

	const tallyWords = () => {
		const userTextArea = document.getElementById("userTextArea") as HTMLTextAreaElement;
		console.log('got here')
		if (userTextArea) {
			console.log("tallyWords -> userTextArea", userTextArea)
			const words = userTextArea.value.split(/\s+/);
			let talliedWords = _.countBy(words, _.identity);
			console.log(talliedWords);
			let excludedWords = _.intersectionWith(Object.keys(talliedWords), ospd, _.isEqual);
			let includedWords = _.differenceWith(Object.keys(talliedWords), ospd, _.isEqual);
			console.log('presents', excludedWords);
			console.log('dif', includedWords);
		}
	}

	const toggleHideSection = (id: string) => {
		const gottenElement = document.getElementById(id);
		if (gottenElement) {
			let display = gottenElement.style.display;
			(display === "" || display === "block")
				? gottenElement.style.display = "none"
				: gottenElement.style.display = "block";
		}
	}

	const handleImport = () => {

	}

	const sortByFrequency = () => {

	}

	const sortAlphabetically = () => {

	}

	const exportWords = () => {

	}

	const replaceAllIncludedWords = () => {
		// Allow user to copy the new text to clipboard
		const copyNewTextElement = document.getElementById("copyNewText") as HTMLInputElement;
		if (copyNewTextElement) {
			copyNewTextElement.disabled = false;
			$("#copyNewText").click(function () {
				// navigator.clipboard.writeText(modMessage + ' ' + credits)
				// 	.then(() => { alert(`Your new text has been copied to clipboard!`) })
				// 	.catch((error) => { alert(`Failed to copy to clipboard! ${error}`) })
			});
		}
	}

	return (
		<ProperNounReplace
			toggleHideSection={toggleHideSection}
			tallyWords={tallyWords}
			handleImport={handleImport}
			sortByFrequency={sortByFrequency}
			sortAlphabetically={sortAlphabetically}
			exportWords={exportWords}
			replaceAllIncludedWords={replaceAllIncludedWords}
		/>
	);
}

export default properNounReplaceContainer;