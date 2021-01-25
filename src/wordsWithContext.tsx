import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import { WordWithContextModel } from './models';
import Context from './context';

export interface WordsWithContextProps {
  words: WordWithContextModel[],
  wordsAreExcluded: boolean,
  allWords: string[],
  handleWordListChange: (word: WordWithContextModel) => any,
}

const WordsWithContext = (props: WordsWithContextProps) => {
  const {
    words,
    wordsAreExcluded,
    handleWordListChange,
    allWords,
  } = props;
  let wordList: any[] = [];

  words.map((word, wordIndex) => {
    let maxWordLength = 12;
    let maxButtonWordLength = 7;
    let wordCleaned: string = Object.keys(word)[0];
    let contextIndeces: number[] = Object.values(word)[0];

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
          <Context
            contextIndeces={contextIndeces}
            allWords={allWords}
          />
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