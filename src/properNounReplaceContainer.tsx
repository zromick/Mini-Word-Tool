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
			// Split all user text into an array when hitting white space, line breaks, and dashes.
			// Filter out blank strings.
			let allWords = userTextArea.value.split(/\s+|-/).filter(i => i);
			// Add context to the words by getting surrounding words
			const allWordsWithContext = allWords.map((word, i) => {
				const contextString =
					_.join(allWords.slice(i > 3 ? i - 3 : 0, i < allWords.length - 4 ? i + 4 : allWords.length), ' ');
				const wordLocation = contextString.indexOf(word);
				const wordLength = word.length;
				return { [word]: { contextString, wordLocation, wordLength } }
			});
			console.log('all words', allWordsWithContext);
			// Clean and standardize words and then check if they are in OSPD.
			allWordsWithContext.map(wordWithContext => {
				console.log("sortWords -> wordWithContext", wordWithContext)
				// Rename keys to uppercase and without punctuation (except apostrophes)
				const newKey = (Object.keys(wordWithContext)[0]).replace(/[^\w\s']/g, "").toUpperCase();
				// If the cleaned word is in the Scrabble Dictionary, exclude.
				// If the uncleaned word contains a number, exclude.
				if (defaultExcludedWords.indexOf(newKey) !== -1 || /\d/.test(Object.keys(wordWithContext)[0])) {
					// Attempt to merge dupes
					let tryexclusion = _.merge({ [newKey]: [Object.values(wordWithContext)[0]] }, ...excludedWords);
					console.log(`tryexclusion`, tryexclusion);
					excludedWords.push({ [newKey]: Object.values(wordWithContext)[0] });

				} else {
					// Attempt to merge dupes
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
			let excludedWordsTitle = document.getElementById('excludedWordsTitle');
			let includedWordsTitle = document.getElementById('includedWordsTitle');
			if (excludedWordsTitle) {
				excludedWordsTitle.innerHTML = `Words Excluded From Replacement - ${excludedWords.length} word(s)`;
			}
			if (includedWordsTitle) {
				includedWordsTitle.innerHTML = `Words Included in Replacement - ${includedWords.length} word(s)`;
			}
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