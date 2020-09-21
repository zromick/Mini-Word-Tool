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
		let newExcludedWords: WordWithContextModel[] = [];
		let newIncludedWords: WordWithContextModel[] = [];
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
				const contextStringHalf1 =
					_.join(allWords.slice(i > 3 ? i - 3 : 0, i), ' ');
				const contextStringHalf2 =
					_.join(allWords.slice(i + 1, i < allWords.length - 4 ? i + 4 : allWords.length), ' ');
				const contextStringSelectedWord = allWords[i];
				return { [word]: { contextStringHalf1, contextStringHalf2, contextStringSelectedWord } }
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
					// let tryexclusion = _.merge({ [newKey]: [Object.values(wordWithContext)[0]] }, ...excludedWords);
					// console.log(`tryexclusion`, tryexclusion);
					let newElement = { [newKey]: Object.values(wordWithContext)[0] };
					// console.log(`index of new element for exclusion current exclusions: `, excludedWords);
					// console.log(`index of new element for exclusion: `, excludedWords.indexOf(newElement));
					if (excludedWords.indexOf(newElement) === -1) {
						newExcludedWords.push({ [newKey]: Object.values(wordWithContext)[0] });
					}
				} else {
					newIncludedWords.push({ [newKey]: Object.values(wordWithContext)[0] });
				}
				return null;
			})
			console.log('presents', newExcludedWords);
			console.log('dif', newIncludedWords);
			updateExcludedWords(newExcludedWords);
			updateIncludedWords(newIncludedWords);
			// Update excluded and included headers with word count
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

	const handleExport = () => {
		// Todo
	}

	const handleIncludeWord = (word: WordWithContextModel) => {
		includedWords.push(word);
		_.pull(excludedWords, word);
		updateExcludedWords([...excludedWords]);
		updateIncludedWords([...includedWords]);
	}

	const handleExcludeWord = (word: WordWithContextModel) => {
		excludedWords.push(word);
		_.pull(includedWords, word);
		updateExcludedWords([...excludedWords]);
		updateIncludedWords([...includedWords]);
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
			handleExport={handleExport}
			handleIncludeWord={handleIncludeWord}
			handleExcludeWord={handleExcludeWord}
			replaceAllIncludedWords={replaceAllIncludedWords}
			excludedWords={excludedWords}
			includedWords={includedWords}
		/>
	);
}

export default ProperNounReplaceContainer;