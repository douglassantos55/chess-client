export type Color = "black" | "white";

export type Piece = {
  color: Color;
  notation: string;
  movement: Movement;
};

export interface Square {
  col: string;
  row: number;
}

export type Row = {
    [col: string]: Piece | null
}

export type Board = Row[]

export interface Movement {
    getAvailableMoves(from: Square, board: Board): Square[]
}

