export type Color = "black" | "white";

export type Piece = {
  color: Color;
  notation: string;
};

export interface Square {
  col: string;
  row: number;
}
