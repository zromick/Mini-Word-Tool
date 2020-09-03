import React, { useState } from 'react';
import ProperNounReplace from './properNounReplace';
import { ospd, wikiContractions } from './commonWords'; // Official Scrabble Player's Dictionary
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
		const userTextArea = document.getElementById("userTextArea") as HTMLTextAreaElement;
		// Default exlusions include English Scrabble words and English contractions.
		let defaultExcludedWords = ospd().concat(wikiContractions().map(contraction => contraction.toUpperCase()));

		// Add "I" and "A" to excluded words.
		// defaultExcludedWords = defaultExcludedWords.concat(["A", "I"]);

		// Tallying removed for now
		// Tally the total number of
		// const talliedWords = _.countBy(words, _.identity);

		if (userTextArea) {
			// Split all user text into an array when hitting white spac, line breaks, and dashes.
			const allWords = userTextArea.value.split(/\s+|-/);
			// Add context to the words by getting surrounding words
			const allWordsWithContext = allWords.map((word, i) => {
				const contextString =
					_.join(allWords.slice(i > 3 ? i - 3 : i, i < allWords.length - 4 ? i + 4 : i + 1), ' ');
				const wordLocation = contextString.indexOf(word);
				const wordLength = word.length;
				return { [word]: { contextString, wordLocation, wordLength } }
			});
			console.log('all words', allWordsWithContext);
			// Clean and standardize words and then check if they are in OSPD.
			allWordsWithContext.map(wordWithContext => {
				// Rename keys to uppercase and without punctuation (except apostrophes)
				const newKey = (Object.keys(wordWithContext)[0]).replace(/[^\w\s']/g, "").toUpperCase();
				// If the cleaned word is in the Scrabble Dictionary, exclude.
				// If the uncleaned word contains a number, exclude.
				if (defaultExcludedWords.indexOf(newKey) !== -1 || /\d/.test(Object.keys(wordWithContext)[0])) {
					// excludedWords = _.unionBy(excludedWords, newKey); // Attempt to remove dupes
					excludedWords.push({ [newKey]: Object.values(wordWithContext)[0] });

				} else {
					// includedWords = _.unionBy(includedWords, newKey); // Attempt to remove dupes
					includedWords.push({ [newKey]: Object.values(wordWithContext)[0] });
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