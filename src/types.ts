import type Board from "./Board";

export enum Color {
  Black = "black",
  White = "white",
}

export type Piece = {
  color: Color;
  notation: string;
  movement: Movement;
  moveCount: number;
  position?: Square;
};

export interface Square {
  col: string;
  row: number;
}

export type Row = {
  [col: string]: Piece | null;
};

export interface Movement {
  getAvailableMoves(from: Square, board: Board): Square[][];
  getCaptureSquares(from: Square, board: Board): Square[][];
}
