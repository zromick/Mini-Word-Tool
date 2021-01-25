import React from 'react';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

export interface ContextProps {
  contextIndeces: number[];
  allWords: string[];
}

const CONTEXT_BOUNDS_LENGTH = 4;

// Create a context string for each appearance of the word in the text
const Context = (props: ContextProps) => {
  const {
    contextIndeces,
    allWords
  } = props;
  let contextList: any[] = [];
  let contextBuildingArrayFirstHalf: string[] = [];
  let contextBuildingArraySecondHalf: string[] = [];
  contextIndeces.map((indexThatWordAppears: number) => {
    for (let i = 1; i < CONTEXT_BOUNDS_LENGTH; i++) {
      if (typeof (allWords[indexThatWordAppears - i]) !== "undefined") {
        contextBuildingArrayFirstHalf.unshift(allWords[indexThatWordAppears - i]);
      }
      if (typeof (allWords[indexThatWordAppears + i]) !== "undefined") {
        contextBuildingArraySecondHalf.push(allWords[indexThatWordAppears + i]);
      }
    }
    contextList.push(
      <Typography style={{ wordBreak: 'break-all' }}>
        {_.join(contextBuildingArrayFirstHalf, ' ')}<b>{` ${allWords[indexThatWordAppears]} `}</b>{_.join(contextBuildingArraySecondHalf, ' ')}
      </Typography>
    );
    contextBuildingArrayFirstHalf = [];
    contextBuildingArraySecondHalf = [];
    return null;
  });
  return (
    <div>
      {contextList}
    </div>
  );
}

export default Context;