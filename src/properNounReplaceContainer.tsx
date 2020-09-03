import React, { useState } from 'react';
import ProperNounReplace from './properNounReplace';
import { ospd } from './ospd'; // Official Scrabble Player's Dictionary
import _ from 'lodash';
import $ from 'jquery';
import { WordWithContextModel } from './models';

const ProperNounReplaceContainer = () => {

	const [excludedWords, updateExcludedWords] = useState([] as WordWithContextModel[]);
	const [includedWords, updateIncludedWords] = useState([] as WordWithContextModel[]);
	// Paste text and sort words into "Excluded" or "Included"
	const sortWords = () => {
		let excludedWords: WordWithContextModel[] = [];
		let includedWords: WordWithContextModel[] = [];
		// const excludedWordsElement = document.getElementById("excludedWords") as HTMLInputElement;
		// const includedWordsElement = document.getElementById("includedWords") as HTMLInputElement;
		const userTextArea = document.getElementById("userTextArea") as HTMLTextAreaElement;
		const scrabbleDictionary = ospd();

		// Tallying removed for now
		// Tally the total number of 
		// const talliedWords = _.countBy(words, _.identity);

		if (userTextArea) {
			// Split all user text into an array when hitting white space and line breaks.
			const allWords = userTextArea.value.split(/\s+/);
			// Add context to the words by getting surrounding words
			const allWordsWithContext = allWords.map((word, i) => {
				const contextString =
					_.join(allWords.slice(i > 3 ? i - 3 : i, i < allWords.length - 4 ? i + 4 : i + 1), ' ');
				const wordLocation = contextString.indexOf(word);
				const wordLength = word.length;
				return { [word]: { contextString, wordLocation, wordLength } }
			});
			console.log('all words', allWordsWithContext);
			// Clean and standardize words and then see if they are in OSPD.
			// If the word is in the OSPD, exclude the word.
			allWordsWithContext.map(wordWithContext => {
				// Test if word only contains a number
				if (!/^\d+$/.test(Object.keys(wordWithContext)[0])) {
					// Rename keys to uppercase and without punctuation
					const newKey = (Object.keys(wordWithContext)[0]).replace(/[^\w\s]/g, "").toUpperCase();
					if (scrabbleDictionary.indexOf(newKey) !== -1) {
						// excludedWords = _.unionBy(excludedWords, newKey); // Attempt to remove dupes
						excludedWords.push({ [newKey]: Object.values(wordWithContext)[0] });

					} else {
						// includedWords = _.unionBy(includedWords, newKey); // Attempt to remove dupes
						includedWords.push({ [newKey]: Object.values(wordWithContext)[0] });
					}
				}
				return null;
			})
			// // Remove duplicate words.
			// wordsToCompare = _.uniq(wordsToCompare);
			console.log('presents', excludedWords);
			console.log('dif', includedWords);
			updateExcludedWords(excludedWords);
			updateIncludedWords(includedWords);
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
		// Todo
	}

	const sortByFrequency = () => {
		// Todo
	}

	const sortAlphabetically = () => {
		// Todo
	}

	const exportWords = () => {
		// Todo
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
			sortWords={sortWords}
			handleImport={handleImport}
			sortByFrequency={sortByFrequency}
			sortAlphabetically={sortAlphabetically}
			exportWords={exportWords}
			replaceAllIncludedWords={replaceAllIncludedWords}
			excludedWords={excludedWords}
			includedWords={includedWords}
		/>
	);
}

export default ProperNounReplaceContainer;