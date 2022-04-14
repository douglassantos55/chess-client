export enum Color {
  Black = "black",
  White = "white",
}

export type Piece = {
  color: Color;
  notation: string;
  movement: Movement;
  position?: Square;
};

export interface Square {
  col: string;
  row: number;
}

export type Row = {
  [col: string]: Piece | null;
};

export type Board = Row[];

export interface Movement {
  getAvailableMoves(from: Square, board: Board): Square[];
  getCaptureSquares(from: Square, board: Board): Square[];
}
