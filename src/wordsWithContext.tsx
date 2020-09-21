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
    let maxWordLength = 15;
    let maxButtonWordLength = 7;

    // Make a context string for all the examples that the word shows up in the user's text
    Object.values(word)[0].map((context, contextIndex) => {
      let wordString: string = context.contextStringSelectedWord;
      let contextStringHalf1: string = context.contextStringHalf1;
      let contextStringHalf2: string = context.contextStringHalf2;

      wordList.push(
        <Grid container key={`Key${word}${wordIndex}${contextIndex}`}>
          <Grid item xs={3}>
            {wordString.length > maxWordLength
              ? <Tooltip title={wordString}>
                <div>
                  {wordString.substr(0, maxWordLength) + '...'}
                </div>
              </Tooltip>
              : <div>{wordString}</div>
            }
          </Grid>
          <Grid item xs={5}>
            <Typography style={{ wordBreak: 'break-all' }}>
              {contextStringHalf1}<b>{` ${wordString} `}</b>{contextStringHalf2}
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Button
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