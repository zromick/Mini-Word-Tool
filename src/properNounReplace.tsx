import React from 'react';
import WordsWithContext from './wordsWithContext';
import { WordWithContextModel } from './models';

export interface ProperNounReplaceProps {
	toggleHideSection: (id: string) => any,
	sortWords: () => any,
	sortByFrequency: () => any,
	sortAlphabetically: () => any,
	handleImport: () => any,
	handleExport: () => any,
	handleIncludeWord: (word: WordWithContextModel) => any,
	handleExcludeWord: (word: WordWithContextModel) => any,
	handleShowContext: (word: WordWithContextModel) => any,
	replaceAllIncludedWords: () => any,
	excludedWords: WordWithContextModel[],
	includedWords: WordWithContextModel[],
}

const ProperNounReplace = (props: ProperNounReplaceProps) => {
	const {
		toggleHideSection,
		sortWords,
		// sortByFrequency,
		// sortAlphabetically,
		handleImport,
		handleExport,
		handleExcludeWord,
		handleIncludeWord,
		handleShowContext,
		replaceAllIncludedWords,
		excludedWords,
		includedWords,
	} = props;
	// h3 class="panel-title"
	return (
		<div>
			<h3>Minimalistic Word Frequency Counter and Proper Noun Replacement Tool</h3>
			<p>By <a href="https://github.com/zromick">Zac Romick</a></p>
			<p>Suggestions? Please send me an email: <a href="mailto:zachary.romick@vanderbilt.edu">zachary.romick@vanderbilt.edu</a></p>
			<p>Created on August 21, 2020</p>
			<p>Last Updated in September 2020</p>
			<p>Note: Expand or collapse any title by clicking on it</p>

			<h3 onClick={() => toggleHideSection('introductionBody')}>Introduction</h3>
			<div id="introductionBody" style={{ display: "none" }}>
				<p>This application was created to help writers replace multiple proper nouns at once.</p>
				<p>Users can also keep track of their changes by exporting/importing words and their replacements.</p>
				<p>The basic flow is as such:</p>
				<ol>
					<li>Paste your text</li>
					<li>Choose whether to include or exclude words</li>
					<li>Decide which words will be replaced (included words)</li>
					<li>Write replacement words for each included word</li>
					<li>Replace the entire text with replacement words</li>
				</ol>
				<h4 onClick={() => toggleHideSection('introExampleBody')}>Example</h4>
				<div id="introExampleBody" style={{ display: "none" }}>
					<p>Input Text: </p>
					<p>Jeremiah's friend, Sarah, greeted Muhammad and asked him about the milk.</p>
					<p>Julia suspected the milk belonged to Muhammad.</p>
					<p>The milk was Muhammad's.</p>
					<ul>
						<p>Jeremiah's (1). Replace with: Charles'</p>
						<p>Sarah (1). Replace with: Julia</p>
						<p>Sarah, (1). Replace with: Julia,</p>
						<p>Muhammad. (1). Replace with: T. K.</p>
						<p>Muhammad's. (1)s. Replace with: T. K.'s.</p>
					</ul>
					<p>Output Text: </p>
					<p>Charles's friend, Julia, greeted T. K. and asked him about the milk.</p>
					<p>She suspected the milk belonged to T. K.</p>
					<p>The milk was T. K.'s.</p>
				</div>
			</div>

			<h3 onClick={() => toggleHideSection('pasteTextBody')}>Step 1: Paste Text Here</h3>
			<div id='pasteTextBody'>
				{/* <p>Once pasted, word count frequency will be calculated.</p>
				<p>Common English words will be placed into an Excluded Words section to keep things clean.</p>
				<p>Everything else will be placed into the Included Words section.</p> */}
				<textarea id="userTextArea" cols={40} rows={8} onChange={() => sortWords()}></textarea>
				{/* <button onClick={() => sortWords()}>Sort</button> */}
				<h4 onClick={() => toggleHideSection('importBody')}>Optional: Import</h4>
				<div id='importBody' style={{ display: "none" }}>
					{/* <p>You can import previously exported excluded/included words by pasting the export in the text area.</p>
					<p>Words that have no replacement word will be excluded.</p>
					<p>Words that have a semicolon and replacement word will be included.</p> */}
					<textarea id="importTextArea" cols={40} rows={4} onChange={() => handleImport()}></textarea>
					<br />
				</div>
			</div>

			<h3 onClick={() => toggleHideSection('wordManagerBody')}>Step 2: Manage Your Words</h3>
			<div id='wordManagerBody'>
				{/* <p>Excluded words will not be replaced. The default functionality is to exclude common English words.</p>
				<p>Included words are words to replace with new words.</p>
				<button id="frequencySort" onClick={() => sortByFrequency()}>Sort by Frequency</button>
				<button id="frequencySort" onClick={() => sortAlphabetically()}>Sort Alphabetically</button> */}
				<h4 id='wordCountTitle'>Word Count</h4>
				<h4 id='excludedWordsTitle' onClick={() => toggleHideSection('excludedWordsBody')}>Words Excluded From Replacement</h4>
				<div id='excludedWordsBody'>
					{/* <p>Click the "Include" button next to a word to add it to the bottom of the "Included Words" list.</p> */}
					<WordsWithContext
						words={excludedWords}
						wordsAreExcluded={true}
						handleWordListChange={handleIncludeWord}
						handleShowContext={handleShowContext}
					/>
				</div>
				<h4 id='includedWordsTitle' onClick={() => toggleHideSection('includedWordsBody')}>Words Included in Replacement</h4>
				<div id='includedWordsBody'>
					{/* <p>Click the "Exclude" button next to a word to add it to the bottom of the "Excluded Words" list.</p>
					<p>Click "Export" to export excluded/included Words (copy to clipboard).</p>
					<p>This should be saved "as is" and used in the import area above.</p> */}
					<button id="frequencySort" onClick={() => handleExport()}>Export</button>
					<br />
					<br />
					<WordsWithContext
						words={includedWords}
						wordsAreExcluded={false}
						handleWordListChange={handleExcludeWord}
						handleShowContext={handleShowContext}
					/>
				</div>
			</div>

			<h3 onClick={() => toggleHideSection('generateNewTextBody')}>Step 3: Generate New Text</h3>
			<div id='generateNewTextBody'>
				{/* <p>Click "Replace All" to generate new text.</p>
				<p>The included words will be replaced and new text will be copied to your clipboard.</p> */}
				<button id="replaceAll" onClick={() => replaceAllIncludedWords()}>Replace All</button>
				<br />
				<br />
				<textarea id="finalTextArea" cols={40} rows={5}></textarea>
				<br />
				<button id="copyNewText" disabled>Copy New Text to Clipboard</button>
			</div>
		</div>
	);
}

export default ProperNounReplace;