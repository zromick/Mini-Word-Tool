import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import styles from './properNounReplace.scss';

export interface WordsWithContextProps {
  words: { [x: string]: string; }[],
  wordsAreExcluded: boolean,
}

const WordsWithContext = (props: WordsWithContextProps) => {
  const { words, wordsAreExcluded } = props;
  let wordList: any[] = [];

  words.map((word, index) => {
    let maxWordLength = 15;
    let maxButtonWordLength = 8;
    let wordString: string = Object.keys(word)[0];
    let contextString: string = Object.values(word)[0];
    wordList.push(
      <Grid container key={`Key${word}${index}`}>
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
        <Grid item xs={6} className={styles.wordBreak}>
          {contextString}
        </Grid>
        <Grid item xs={3}>
          <button>
            {wordsAreExcluded
              ? `Include '${wordString.length > maxButtonWordLength
                ? wordString.substr(0, maxButtonWordLength) + '...'
                : wordString}'`
              : `Exclude '${wordString.length > maxButtonWordLength
                ? wordString.substr(0, maxButtonWordLength) + '...'
                : wordString}'`
            }
          </button>
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