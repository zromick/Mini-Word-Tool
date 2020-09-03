export interface WordWithContextModel {
  [word: string]: {
    contextString: string;
    wordLocation: number;
    wordLength: number;
  };
}
