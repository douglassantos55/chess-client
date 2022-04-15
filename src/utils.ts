import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import Knight from "@/knight";
import Safe from "@/safe";
import Forward, { Direction } from "@/forward";
import type { Piece, Board, Square, Movement } from "@/types";
import { Color } from "@/types";

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
      a: piece("R", Color.White, new Straight()),
      b: piece("N", Color.White, new Knight()),
      c: piece("B", Color.White, new Diagonal()),
      d: piece("Q", Color.White, new Combined(new Straight(), new Diagonal())),
      e: piece(
        "K",
        Color.White,
        new Safe(new Combined(new Straight(1), new Diagonal(1)))
      ),
      f: piece("B", Color.White, new Diagonal()),
      g: piece("N", Color.White, new Knight()),
      h: piece("R", Color.White, new Straight()),
    },
    {
      a: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "a", row: 1 })
      ),
      b: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "b", row: 1 })
      ),
      c: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "c", row: 1 })
      ),
      d: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "d", row: 1 })
      ),
      e: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "e", row: 1 })
      ),
      f: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "f", row: 1 })
      ),
      g: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "g", row: 1 })
      ),
      h: piece(
        "p",
        Color.White,
        new Forward(Direction.Up, { col: "h", row: 1 })
      ),
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
      a: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "a", row: 6 })
      ),
      b: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "b", row: 6 })
      ),
      c: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "c", row: 6 })
      ),
      d: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "d", row: 6 })
      ),
      e: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "e", row: 6 })
      ),
      f: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "f", row: 6 })
      ),
      g: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "g", row: 6 })
      ),
      h: piece(
        "p",
        Color.Black,
        new Forward(Direction.Down, { col: "h", row: 6 })
      ),
    },
    {
      a: piece("R", Color.Black, new Straight()),
      b: piece("N", Color.Black, new Knight()),
      c: piece("B", Color.Black, new Diagonal()),
      d: piece("Q", Color.Black, new Combined(new Straight(), new Diagonal())),
      e: piece(
        "K",
        Color.Black,
        new Safe(new Combined(new Straight(1), new Diagonal(1)))
      ),
      f: piece("B", Color.Black, new Diagonal()),
      g: piece("N", Color.Black, new Knight()),
      h: piece("R", Color.Black, new Straight()),
    },
  ];
}
