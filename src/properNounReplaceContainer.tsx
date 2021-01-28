import React, { useState } from 'react';
import ProperNounReplace from './properNounReplace';
import { ospd, wikiContractions } from './commonWords'; // Official Scrabble Player's Dictionary
import _ from 'lodash';
import $ from 'jquery';
import { Word } from './models';

const ProperNounReplaceContainer = () => {
	let [excludedWords, updateExcludedWords] = useState([] as Word[]);
	let [includedWords, updateIncludedWords] = useState([] as Word[]);
	// let [allWords, updateAllWords] = useState([] as Word[]);
	let [allWordsRaw, updateAllWordsRaw] = useState([] as string[]);
	// Paste text and sort words into "Excluded" or "Included"
	const sortWords = () => {
		let excludedWordsTemp: Word[] = [];
		let includedWordsTemp: Word[] = [];
		const userTextArea = document.getElementById("userTextArea") as HTMLTextAreaElement;
		// Default exlusions include English Scrabble words and English contractions.
		let defaultExcludedWords = ospd().concat(wikiContractions().map(contraction => contraction.toUpperCase()));
		if (userTextArea) {
			// Split all user text into an array when hitting white space, line breaks, and dashes.
			// Filter out blank strings.
			console.log((new Date()).toLocaleString())
			//let promise = new Promise(function (resolve, reject) {
			allWordsRaw = userTextArea.value.split(/\s+|-/).filter(i => i);
			allWordsRaw.map((word, wordIndex) => {
				// Rename keys to uppercase and without punctuation (except apostrophes)
				let key = word.replace(/[^\w\s']/g, "").toUpperCase();
				// If the cleaned word is in the Scrabble Dictionary, exclude
				// If the uncleaned word contains a number, exclude
				if (defaultExcludedWords.indexOf(key) !== -1 || /\d/.test(word)) {
					// If the word is a new excluded word, push it.
					let excludedWordIndex = (excludedWordsTemp.map(word => Object.keys(word)[0])).indexOf(key);
					if (excludedWordIndex === -1) {
						console.log(excludedWordsTemp, excludedWordIndex, key, wordIndex);
						excludedWordsTemp.push({ [key]: { 'default': [wordIndex] } })
						// For testing excludedWordsTemp[0][key]['samurai'] = [33, 34, 66];
						// For testing excludedWordsTemp[0][key]['flan'] = [27, 89];
					}
					// Else give the existing key more context.
					else {
						console.log(excludedWordsTemp, excludedWordIndex, key, wordIndex);
						excludedWordsTemp[excludedWordIndex][key]['default'].push(wordIndex);
					}
				} else {
					// If the word is a new included word, push it.
					let includedWordIndex = (includedWordsTemp.map(word => Object.keys(word)[0])).indexOf(key);
					if (includedWordIndex === -1) {
						includedWordsTemp.push({ [key]: { 'default': [wordIndex] } })
					}
					// Else, give the existing key more context.
					else {
						includedWordsTemp[includedWordIndex][key]['default'].push(wordIndex);
					}
				}
				return null;
			});
			// console.log('aawords raw', allWordsRaw);
			// console.log('all words', allWords)
			updateExcludedWords([...excludedWordsTemp]);
			updateIncludedWords([...includedWordsTemp])
			updateAllWordsRaw([...allWordsRaw]);
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
			wordCountTitle.innerHTML = `Word Count - ${allWordsRaw.length} word(s). ${excludedWords.length + includedWords.length} unique word(s)`;
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

	// Sent into the handleWordListChange prop for wordsWithContext
	const handleIncludeWord = (word: Word) => {
		includedWords.push(word);
		_.pull(excludedWords, word);
		updateExcludedWords([...excludedWords]);
		updateIncludedWords([...includedWords]);
		tallyTitleTotals();
	}

	// Sent into the handleWordListChange prop for wordsWithContext
	const handleExcludeWord = (word: Word) => {
		excludedWords.push(word);
		_.pull(includedWords, word);
		updateExcludedWords([...excludedWords]);
		updateIncludedWords([...includedWords]);
		tallyTitleTotals();
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
			replaceAllIncludedWords={replaceAllIncludedWords}
			excludedWords={excludedWords}
			includedWords={includedWords}
			allWordsRaw={allWordsRaw}
		/>
	);
}

export default ProperNounReplaceContainer;