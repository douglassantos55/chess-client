import Forward, { Direction } from '@/forward'
import type { Color, Piece, Board, Square, Movement } from "@/types";

export function piece(notation: string, color: Color, movement: Movement): Piece {
  return { color, notation, movement };
}

export function parseSquare(square: string): Square | null {
  const [col, row] = square.split("");
  const invalidCol = col > "h" || col < "a";
  const invalidRow = parseInt(row) < 1 || parseInt(row) > 8;

  if (invalidCol || invalidRow) {
    return null;
  }

  return { col, row: parseInt(row) - 1 };
}

export function createBoard(): Board {
  return [
    {
      a: piece("R", "white", new Forward(Direction.Up)),
      b: piece("N", "white", new Forward(Direction.Up)),
      c: piece("B", "white", new Forward(Direction.Up)),
      d: piece("Q", "white", new Forward(Direction.Up)),
      e: piece("K", "white", new Forward(Direction.Up)),
      f: piece("B", "white", new Forward(Direction.Up)),
      g: piece("N", "white", new Forward(Direction.Up)),
      h: piece("R", "white", new Forward(Direction.Up)),
    },
    {
      a: piece("p", "white", new Forward(Direction.Up)),
      b: piece("p", "white", new Forward(Direction.Up)),
      c: piece("p", "white", new Forward(Direction.Up)),
      d: piece("p", "white", new Forward(Direction.Up)),
      e: piece("p", "white", new Forward(Direction.Up)),
      f: piece("p", "white", new Forward(Direction.Up)),
      g: piece("p", "white", new Forward(Direction.Up)),
      h: piece("p", "white", new Forward(Direction.Up)),
    },
    {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
    },
    {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
    },
    {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
    },
    {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
    },
    {
      a: piece("p", "black", new Forward(Direction.Down)),
      b: piece("p", "black", new Forward(Direction.Down)),
      c: piece("p", "black", new Forward(Direction.Down)),
      d: piece("p", "black", new Forward(Direction.Down)),
      e: piece("p", "black", new Forward(Direction.Down)),
      f: piece("p", "black", new Forward(Direction.Down)),
      g: piece("p", "black", new Forward(Direction.Down)),
      h: piece("p", "black", new Forward(Direction.Down)),
    },
    {
      a: piece("R", "black", new Forward(Direction.Down)),
      b: piece("N", "black", new Forward(Direction.Down)),
      c: piece("B", "black", new Forward(Direction.Down)),
      d: piece("Q", "black", new Forward(Direction.Down)),
      e: piece("K", "black", new Forward(Direction.Down)),
      f: piece("B", "black", new Forward(Direction.Down)),
      g: piece("N", "black", new Forward(Direction.Down)),
      h: piece("R", "black", new Forward(Direction.Down)),
    },
  ];
}
