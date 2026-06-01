import React from 'react';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

export interface ContextProps {
  replacementWord: string;
  contextIndeces: number[];
  allWordsRaw: string[];
}

const CONTEXT_BOUNDS_LENGTH = 3; // Grab this many words from the left and right

// Create a context string for each appearance of the word in the text
const Context = (props: ContextProps) => {
  const {
    replacementWord,
    contextIndeces,
    allWordsRaw
  } = props;
  let contextList: any[] = [];
  let contextBuildingArrayFirstHalf: string[] = [];
  let contextBuildingArraySecondHalf: string[] = [];
  if (contextIndeces.length > 0) {
    contextIndeces.map((indexThatWordAppears: number) => {
      for (let i = 1; i <= CONTEXT_BOUNDS_LENGTH; i++) {
        if (typeof (allWordsRaw[indexThatWordAppears - i]) !== "undefined") {
          contextBuildingArrayFirstHalf.unshift(allWordsRaw[indexThatWordAppears - i]);
        }
        if (typeof (allWordsRaw[indexThatWordAppears + i]) !== "undefined") {
          contextBuildingArraySecondHalf.push(allWordsRaw[indexThatWordAppears + i]);
        }
      }
      contextList.push(
        <Typography key={'key' + indexThatWordAppears} style={{ wordBreak: 'break-all' }}>
          {_.join(contextBuildingArrayFirstHalf, ' ')}
          <b>{` ${allWordsRaw[indexThatWordAppears]} -> ${replacementWord} `}</b>
          {_.join(contextBuildingArraySecondHalf, ' ')}
        </Typography>
      );
      contextBuildingArrayFirstHalf = [];
      contextBuildingArraySecondHalf = [];
      return null;
    });
  }
  return (
    <div>
      {contextList}
    </div>
  );
}

export default Context;