import React, { useState } from 'react';
import ProperNounReplace from './properNounReplace';
import { ospd, wikiContractions } from './commonWords'; // Official Scrabble Player's Dictionary
import _ from 'lodash';
import $ from 'jquery';
import { WordWithContextModel } from './models';

const ProperNounReplaceContainer = () => {

	let [excludedWords, updateExcludedWords] = useState([] as WordWithContextModel[]);
	let [includedWords, updateIncludedWords] = useState([] as WordWithContextModel[]);
	let [allWords, updateAllWords] = useState([] as string[]);
	// Paste text and sort words into "Excluded" or "Included"
	const sortWords = () => {
		excludedWords = [];
		includedWords = [];
		const userTextArea = document.getElementById("userTextArea") as HTMLTextAreaElement;
		// Default exlusions include English Scrabble words and English contractions.
		let defaultExcludedWords = ospd().concat(wikiContractions().map(contraction => contraction.toUpperCase()));
		if (userTextArea) {
			// Split all user text into an array when hitting white space, line breaks, and dashes.
			// Filter out blank strings.
			allWords = userTextArea.value.split(/\s+|-/).filter(i => i);
			updateAllWords([...allWords]);
			allWords.map((word, wordIndex) => {
				// Rename keys to uppercase and without punctuation (except apostrophes)
				let key = word.replace(/[^\w\s']/g, "").toUpperCase();
				// If the cleaned word is in the Scrabble Dictionary, exclude
				// If the uncleaned word contains a number, exclude
				if (defaultExcludedWords.indexOf(key) !== -1 || /\d/.test(word)) {
					// If the word is a new excluded word, push it.
					let excludedWordIndex = (excludedWords.map(word => Object.keys(word)[0])).indexOf(key);
					if (excludedWordIndex === -1) {
						excludedWords.push({ [key]: [{ wordIndex }] });
					}
					// Else, give the existing key more context.
					else {
						excludedWords[excludedWordIndex][key].push({ wordIndex });
					}
				} else {
					// If the word is a new included word, push it.
					let includedWordIndex = (includedWords.map(word => Object.keys(word)[0])).indexOf(key);
					if (includedWordIndex === -1) {
						includedWords.push({ [key]: [{ wordIndex }] });
					}
					// Else, give the existing key more context.
					else {
						includedWords[includedWordIndex][key].push({ wordIndex });
					}
				}
				return null;
			});
			updateExcludedWords([...excludedWords]);
			updateIncludedWords([...includedWords]);
			tallyTitleTotals();
		}
	}

	const tallyTitleTotals = () => {
		// Update excluded and included headers with word count
		let excludedWordsTitle = document.getElementById('excludedWordsTitle');
		let includedWordsTitle = document.getElementById('includedWordsTitle');
		let wordCountTitle = document.getElementById('wordCountTitle');
		if (excludedWordsTitle) {
			excludedWordsTitle.innerHTML = `Words Excluded From Replacement - ${excludedWords.length} unique word(s)`;
		}
		if (includedWordsTitle) {
			includedWordsTitle.innerHTML = `Words Included in Replacement - ${includedWords.length} unique word(s)`;
		}
		if (wordCountTitle) {
			wordCountTitle.innerHTML = `Word Count - ${allWords.length} word(s). ${excludedWords.length + includedWords.length} unique word(s)`;
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

	// Sent into the handleWordListChange prop for wordsWithCotnext
	const handleIncludeWord = (word: WordWithContextModel) => {
		includedWords.push(word);
		_.pull(excludedWords, word);
		updateExcludedWords([...excludedWords]);
		updateIncludedWords([...includedWords]);
		tallyTitleTotals();
	}

	// Sent into the handleWordListChange prop for wordsWithCotnext
	const handleExcludeWord = (word: WordWithContextModel) => {
		excludedWords.push(word);
		_.pull(includedWords, word);
		updateExcludedWords([...excludedWords]);
		updateIncludedWords([...includedWords]);
		tallyTitleTotals();
	}

	const handleShowContext = (word: WordWithContextModel) => {
		console.log("handleShowContext")
		// Add context to the words by getting surrounding words
		// const allWordsWithContext = allWords.map((word, i) => {
		// 	const contextStringHalf1 =
		// 		_.join(allWords.slice(i > 3 ? i - 3 : 0, i), ' ');
		// 	const contextStringHalf2 =
		// 		_.join(allWords.slice(i + 1, i < allWords.length - 4 ? i + 4 : allWords.length), ' ');
		// 	const contextStringSelectedWord = allWords[i];
		/* <Typography style={{ wordBreak: 'break-all' }}>
			{contextStringHalf1}<b>{` ${wordString} `}</b>{contextStringHalf2}
		</Typography> */
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
			sortByFrequency={sortByFrequency}
			sortAlphabetically={sortAlphabetically}
			handleImport={handleImport}
			handleExport={handleExport}
			handleIncludeWord={handleIncludeWord}
			handleExcludeWord={handleExcludeWord}
			handleShowContext={handleShowContext}
			replaceAllIncludedWords={replaceAllIncludedWords}
			excludedWords={excludedWords}
			includedWords={includedWords}
		/>
	);
}

export default ProperNounReplaceContainer;