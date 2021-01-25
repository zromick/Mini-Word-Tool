import React from 'react';
import { Grid, Tooltip, Typography, Button } from '@material-ui/core';
import { WordWithContextModel } from './models';
// import styles from './properNounReplace.scss';

export interface WordsWithContextProps {
  words: WordWithContextModel[],
  wordsAreExcluded: boolean,
  handleShowContext: (word: WordWithContextModel) => any,
  handleWordListChange: (word: WordWithContextModel) => any,
}

const WordsWithContext = (props: WordsWithContextProps) => {
  const {
    words,
    wordsAreExcluded,
    handleWordListChange,
    handleShowContext,
  } = props;
  let wordList: any[] = [];

  words.map((word, wordIndex) => {
    let maxWordLength = 12;
    let maxButtonWordLength = 7;

    // Make a context string for all the examples in which the word appears in the user's text
    // let contextStrings = Object.values(word)[0];
    // contextStrings.map((contextString, contextIndex) => {
    let wordCleaned: string = Object.keys(word)[0];
    let contextIndeces: { wordIndex: number }[] = Object.values(word)[0];
    //   let wordString: string = contextString.contextStringSelectedWord;
    //   let contextStringHalf1: string = contextString.contextStringHalf1;
    //   let contextStringHalf2: string = contextString.contextStringHalf2;

    wordList.push(
      <Grid container key={`Key${word}${wordIndex}`}>
        <Grid item xs={3}>
          {wordCleaned.length > maxWordLength
            ? <Tooltip title={wordCleaned}>
              <div>
                {`${wordCleaned.substr(0, maxWordLength)}...(${contextIndeces.length})`}
              </div>
            </Tooltip>
            : <div>{`${wordCleaned}...(${contextIndeces.length})`}</div>
          }
        </Grid>
        <Grid item xs={5}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleShowContext(word)}
          >
            Show Context
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          {
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleWordListChange(word)}
            >
              {wordsAreExcluded
                ? `Include '${wordCleaned.length > maxButtonWordLength
                  ? wordCleaned.substr(0, maxButtonWordLength) + '...'
                  : wordCleaned}'`
                : `Exclude '${wordCleaned.length > maxButtonWordLength
                  ? wordCleaned.substr(0, maxButtonWordLength) + '...'
                  : wordCleaned}'`
              }
            </Button>
          }
        </Grid>
      </Grid>
    );
    return null;
  });

  return (
    <div>
      {wordList}
    </div>
  )
}

export default WordsWithContext;