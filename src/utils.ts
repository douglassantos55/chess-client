import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import Forward, { Direction } from "@/forward";
import type { Color, Piece, Board, Square, Movement } from "@/types";

export function piece(
  notation: string,
  color: Color,
  movement: Movement
): Piece {
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
      a: piece("R", "white", new Straight()),
      b: piece("N", "white", new Forward(Direction.Up, { col: "b", row: 0 })),
      c: piece("B", "white", new Diagonal()),
      d: piece("Q", "white", new Combined(new Straight(), new Diagonal())),
      e: piece("K", "white", new Combined(new Straight(1), new Diagonal(1))),
      f: piece("B", "white", new Diagonal()),
      g: piece("N", "white", new Forward(Direction.Up, { col: "g", row: 0 })),
      h: piece("R", "white", new Straight()),
    },
    {
      a: piece("p", "white", new Forward(Direction.Up, { col: "a", row: 1 })),
      b: piece("p", "white", new Forward(Direction.Up, { col: "b", row: 1 })),
      c: piece("p", "white", new Forward(Direction.Up, { col: "c", row: 1 })),
      d: piece("p", "white", new Forward(Direction.Up, { col: "d", row: 1 })),
      e: piece("p", "white", new Forward(Direction.Up, { col: "e", row: 1 })),
      f: piece("p", "white", new Forward(Direction.Up, { col: "f", row: 1 })),
      g: piece("p", "white", new Forward(Direction.Up, { col: "g", row: 1 })),
      h: piece("p", "white", new Forward(Direction.Up, { col: "h", row: 1 })),
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
      a: piece("p", "black", new Forward(Direction.Down, { col: "a", row: 6 })),
      b: piece("p", "black", new Forward(Direction.Down, { col: "b", row: 6 })),
      c: piece("p", "black", new Forward(Direction.Down, { col: "c", row: 6 })),
      d: piece("p", "black", new Forward(Direction.Down, { col: "d", row: 6 })),
      e: piece("p", "black", new Forward(Direction.Down, { col: "e", row: 6 })),
      f: piece("p", "black", new Forward(Direction.Down, { col: "f", row: 6 })),
      g: piece("p", "black", new Forward(Direction.Down, { col: "g", row: 6 })),
      h: piece("p", "black", new Forward(Direction.Down, { col: "h", row: 6 })),
    },
    {
      a: piece("R", "black", new Straight()),
      b: piece("N", "black", new Forward(Direction.Down, { col: "b", row: 7 })),
      c: piece("B", "black", new Diagonal()),
      d: piece("Q", "black", new Combined(new Straight(), new Diagonal())),
      e: piece("K", "black", new Combined(new Straight(1), new Diagonal(1))),
      f: piece("B", "black", new Diagonal()),
      g: piece("N", "black", new Forward(Direction.Down, { col: "g", row: 7 })),
      h: piece("R", "black", new Straight()),
    },
  ];
}
