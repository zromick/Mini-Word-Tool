import React from 'react';
import { Grid } from '@material-ui/core';

export interface WordsWithContextProps {
	words: { [x: string]: string; }[],
	wordsAreExcluded: boolean,
}

const WordsWithContext = (props: WordsWithContextProps) => {
	const { words, wordsAreExcluded } = props;
	let wordList: any[] = [];

	words.map(word => {
		let wordString: string = Object.keys(word)[0];
		let contextString: string = Object.values(word)[0];
		wordList.push(
			<Grid container>
				<Grid item xs={2}>
					{wordString}
				</Grid>
				<Grid item xs={8}>
					{contextString}
				</Grid>
				<Grid item xs={2}>
					<button>{wordsAreExcluded ? "Include" : "Exclude"}</button>
				</Grid>
			</Grid>
		);
		return null;
	})

	return (
		<div>
			{wordList}
		</div>
	)
}

export default WordsWithContext;