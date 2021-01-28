import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import { Word } from './models';
import Context from './context';

export interface WordsWithContextProps {
  words: Word[],
  wordsAreExcluded: boolean,
  allWordsRaw: string[],
  handleWordListChange: (word: Word) => any,
}

const WordsWithContext = (props: WordsWithContextProps) => {
  const {
    words,
    wordsAreExcluded,
    handleWordListChange,
    allWordsRaw,
  } = props;
  let wordList: any[] = [];

  words.map((word, wordIndex) => {
    let maxWordLength = 12;
    let maxButtonWordLength = 7;
    let wordCleaned: string = Object.keys(word)[0];
    let contextIndecesCollection: number[] = [];

    // Get all the places that the word is mentioned (contextIndeces per word replacement)
    Object.values(word[wordCleaned])
      .map(contextIndeces => contextIndecesCollection = contextIndecesCollection.concat(contextIndeces));


    wordList.push(
      <Grid container key={`Key${word}${wordIndex}`}>
        <Grid item xs={3}>
          {wordCleaned.length > maxWordLength
            ? <Tooltip title={wordCleaned}>
              <div>
                {`${wordCleaned.substr(0, maxWordLength)}...(${contextIndecesCollection.length})`}
              </div>
            </Tooltip>
            : <div>{`${wordCleaned}...(${contextIndecesCollection.length})`}</div>
          }
        </Grid>
        <Grid item xs={5}>
          <Context
            contextIndeces={contextIndecesCollection.sort()}
            allWordsRaw={allWordsRaw}
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