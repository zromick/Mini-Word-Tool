// export interface WordWithContextModel {
//   [word: string]: {
//     contextStringHalf1: string;
//     contextStringHalf2: string;
//     contextStringSelectedWord: string;
//   }[];
// }

export interface WordWithContextModel {
  // Number array represents the indeces at which the word shows up in text
  [word: string]: number[];
}

