import React from 'react';
import { Grid, Tooltip, Button, TextField } from '@material-ui/core';
import { Word } from './models';
import Context from './context';
import styles from './properNounReplace.module.scss'

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
    let wordCount: number = 0;

    // Get wordCount
    Object.values(word[wordCleaned]).map(contextIndeces => wordCount += contextIndeces.length);

    // Replace the word with its appropriate replacement
    Object.values(word[wordCleaned])
      .map((contextIndeces, replacementIndex) =>
        wordList.push(
          <Grid container key={`Key${word}${wordIndex}`} className={styles.wordMargin}>
            {/* THE WORD AND ITS COUNT */}
            <Grid item xs={3}>
              {wordCleaned.length > maxWordLength
                ? <Tooltip title={wordCleaned}>
                  <div>
                    {`${wordCleaned.substr(0, maxWordLength)}...(${wordCount})`}
                  </div>
                </Tooltip>
                : <div>{`${wordCleaned}...(${wordCount})`}</div>
              }
            </Grid>
            {/* CONTEXT STRINGS */}
            <Grid item xs={5}>
              <Context
                replacementWord={replacementIndex === 0 ? Object.keys(word)[0] : Object.keys(word[wordCleaned])[replacementIndex]}
                contextIndeces={contextIndeces}
                allWordsRaw={allWordsRaw}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            {/* INCLUDE/EXCLUDE BUTTON */}
            <Grid item xs={3}>
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
            </Grid>
          </Grid >
        )
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