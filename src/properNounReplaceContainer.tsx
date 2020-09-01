import React from 'react';
import ProperNounReplace from './properNounReplace';
import { ospd } from './ospd'; // Official Scrabble Player's Dictionary
import _ from 'lodash';

const properNounReplaceContainer = () => {

	const tallyWords = () => {
		const scrabbleDictionary = ospd();
		const userTextArea = document.getElementById("userTextArea") as HTMLTextAreaElement;

		// Tallying removed for now
		// Tally the total number of 
		// const talliedWords = _.countBy(words, _.identity);

		if (userTextArea) {
			// Split all user text into an array when hitting white space and line breaks.
			const allWords = userTextArea.value.split(/\s+/);
			// Add context to the words by getting surrounding words
			let allWordsWithContext = allWords.map((word, i) => {
				const contextString =
					_.join(allWords.slice(i > 3 ? i - 3 : i, i < allWords.length - 4 ? i + 4 : i + 1), ' ');
				return { [word]: contextString }
			});
			console.log('all words', allWordsWithContext);
			// Clean and standardize words
			let allCleanedWords: any[] = allWordsWithContext.map(wordWithContext => {
				// Test if word only contains a number
				if (!/^\d+$/.test(Object.keys(wordWithContext)[0])) {
					// Rename keys to uppercase and without punctuation
					return { [(Object.keys(wordWithContext)[0]).replace(/[^\w\s]/g, "").toUpperCase()]: Object.values(wordWithContext)[0] }
				}
			})
			console.log("tallyWords -> allWordKeys", allCleanedWords)
			// // Remove duplicate words.
			// wordsToCompare = _.uniq(wordsToCompare);
			// // Exclude words that are in the OSPD. Include uncommon words, such as proper nouns.
			// let excludedWords = _.intersectionWith(wordsToCompare, scrabbleDictionary, _.isEqual);
			// let includedWords = _.differenceWith(wordsToCompare, scrabbleDictionary, _.isEqual);
			// console.log('presents', excludedWords);
			// console.log('dif', includedWords);
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