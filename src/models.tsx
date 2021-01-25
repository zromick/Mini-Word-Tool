// export interface WordWithContextModel {
//   [word: string]: {
//     contextStringHalf1: string;
//     contextStringHalf2: string;
//     contextStringSelectedWord: string;
//   }[];
// }

export interface WordWithContextModel {
  [word: string]: { wordIndex: number }[];
}

