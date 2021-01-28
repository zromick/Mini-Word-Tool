export interface Word {
  [word: string]: Replacement
}

export interface Replacement {
  [newWord: string]: number[]
}