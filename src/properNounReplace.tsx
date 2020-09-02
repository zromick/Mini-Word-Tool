import React from 'react';

export interface ProperNounReplaceProps {
	toggleHideSection: (id: string) => any,
	sortWords: () => any,
	handleImport: () => any,
	sortByFrequency: () => any,
	sortAlphabetically: () => any,
	exportWords: () => any,
	replaceAllIncludedWords: () => any,
}

const ProperNounReplace = (props: ProperNounReplaceProps) => {
	const {
		toggleHideSection,
		sortWords,
		handleImport,
		sortByFrequency,
		sortAlphabetically,
		exportWords,
		replaceAllIncludedWords
	} = props;
	// h3 class="panel-title"
	return (
		<div>
			<h3>Minimalistic Word Frequency Counter and Proper Noun Replacement Tool</h3>
			<p>By <a href="https://github.com/zromick">Zac Romick</a></p>
			<p>Created on August 21, 2020</p>
			<p>Last Updated on September 1, 2020</p>

			<h3>Introduction
			<img src="./dropdown.svg" alt="A clickable dropdown arrow" width={10} height={10} onClick={() => toggleHideSection('introductionBody')} />
			</h3>
			<div id="introductionBody">
				<p>This application was created to help writers replace multiple proper nouns at once.</p>
				<p>Users can also keep track of their changes by exporting/importing words and their replacements.</p>
				<p>The basic flow is as such:</p>
				<ol>
					<li>Paste your text</li>
					<li>Decide which words will be replaced</li>
					<li>Write replacement words for each included word</li>
					<li>Replace the entire text with replacement words</li>
				</ol>
				<p>Example:</p>
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

			<h3>Step 1: Paste Text Here
			<img src="./dropdown.svg" alt="A clickable dropdown arrow" width={10} height={10} onClick={() => toggleHideSection('pasteTextBody')} />
			</h3>
			<div id='pasteTextBody'>
				<p>Once pasted, word count frequency will be calculated.</p>
				<p>Common English words will be placed into an Excluded Words section to keep things clean.</p>
				<p>Everything else will be placed into the Included Words section.</p>
				<textarea id="userTextArea" cols={40} rows={5} onChange={() => sortWords()}></textarea>
			</div>

			<h3>Step 2: Import
			<img src="./dropdown.svg" alt="A clickable dropdown arrow" width={10} height={10} onClick={() => toggleHideSection('importBody')} />
			</h3>
			<div id='importBody'>
				<p>You can import previously exported excluded/included words by pasting the export in the text area.</p>
				<p>Words that have no replacement word will be excluded.</p>
				<p>Words that have a semicolon and replacement word will be included.</p>
				<textarea id="importTextArea" cols={40} rows={5} onChange={() => handleImport()}></textarea>
				<br />
			</div>

			<h3>Step 3: Manage Your Words
			<img src="./dropdown.svg" alt="A clickable dropdown arrow" width={10} height={10} onClick={() => toggleHideSection('wordManagerBody')} />
			</h3>
			<div id='wordManagerBody'>
				<p>Excluded words will not be replaced. The default functionality is to exclude common English words.</p>
				<p>Included words are words to replace with new words.</p>
				<button id="frequencySort" onClick={() => sortByFrequency()}>Sort by Frequency</button>
				<button id="frequencySort" onClick={() => sortAlphabetically()}>Sort Alphabetically</button>
				<h4>Excluded Words</h4>
				<p>Click the "Include" button next to a word to add it to the bottom of the "Included Words" list.</p>
				<p id="excludedWords"></p>
				<h4>Included Words</h4>
				<p>Click the "Exclude" button next to a word to add it to the bottom of the "Excluded Words" list.</p>
				<p id="includedWords"></p>
				<p>Click "Export" to export excluded/included Words (copy to clipboard).</p>
				<p>This should be saved "as is" and used in the import area above.</p>
				<button id="frequencySort" onClick={() => exportWords()}>Export</button>
			</div>

			<h3>Step 4: Generate New Text
			<img src="./dropdown.svg" alt="A clickable dropdown arrow" width={10} height={10} onClick={() => toggleHideSection('generateNewTextBody')} />
			</h3>
			<div id='generateNewTextBody'>
				<p>Click "Replace All" to generate new text.</p>
				<p>The included words will be replaced and new text will be copied to your clipboard.</p>
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