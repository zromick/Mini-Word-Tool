import React from 'react';
import { Grid, Tooltip, Typography, Button } from '@material-ui/core';
import { WordWithContextModel } from './models';
// import styles from './properNounReplace.scss';

export interface WordsWithContextProps {
  words: WordWithContextModel[],
  wordsAreExcluded: boolean,
  handleWordListChange: (word: WordWithContextModel) => any,
}

const WordsWithContext = (props: WordsWithContextProps) => {
  const { words, wordsAreExcluded, handleWordListChange } = props;
  let wordList: any[] = [];

  words.map((word, wordIndex) => {
    let maxWordLength = 12;
    let maxButtonWordLength = 7;

    // Make a context string for all the examples in which the word appears in the user's text
    let contextStrings = Object.values(word)[0];
    contextStrings.map((contextString, contextIndex) => {
      let wordCleaned: string = Object.keys(word)[0];
      let wordString: string = contextString.contextStringSelectedWord;
      let contextStringHalf1: string = contextString.contextStringHalf1;
      let contextStringHalf2: string = contextString.contextStringHalf2;

      wordList.push(
        <Grid container key={`Key${word}${wordIndex}${contextIndex}`}>
          <Grid item xs={3}>
            {contextIndex === 0
              ? (wordCleaned.length > maxWordLength
                ? <Tooltip title={wordCleaned}>
                  <div>
                    {`${wordCleaned.substr(0, maxWordLength)}...(${contextStrings.length})`}
                  </div>
                </Tooltip>
                : <div>{`${wordCleaned}...(${contextStrings.length})`}</div>)
              : null
            }
          </Grid>
          <Grid item xs={5}>
            <Typography style={{ wordBreak: 'break-all' }}>
              {contextStringHalf1}<b>{` ${wordString} `}</b>{contextStringHalf2}
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            {contextIndex !== -1 // contextIndex === 0
              ? <Button
                fullWidth
                variant="outlined"
                onClick={() => handleWordListChange(word)}>
                {wordsAreExcluded
                  ? `Include '${wordString.length > maxButtonWordLength
                    ? wordString.substr(0, maxButtonWordLength) + '...'
                    : wordString}'`
                  : `Exclude '${wordString.length > maxButtonWordLength
                    ? wordString.substr(0, maxButtonWordLength) + '...'
                    : wordString}'`
                }
              </Button>
              : null
            }
          </Grid>
        </Grid>
      );
      return null;
    });
    return null;
  });

  return (
    <div>
      {wordList}
    </div>
  )
}

export default WordsWithContext;