import Straight from "@/straight";
import Diagonal from "@/diagonal";
import Combined from "@/combined";
import Castle from "@/castle";
import Knight from "@/knight";
import Safe from "@/safe";
import Forward, { Direction } from "@/forward";
import type { Piece, Square, Movement } from "@/types";
import { Color } from "@/types";
import Board from "./Board";

export function piece(
  notation: string,
  color: Color,
  movement: Movement
): Piece {
  return { color, notation, movement, moveCount: 0 };
}

export function validateSquare(square: Square): boolean {
  const { col, row } = square;
  const validRow = row >= 0 && row < 8;
  const validColumn = col >= "a" && col <= "h";

  return validRow && validColumn;
}

export function parseSquare(square: Square): string {
  if (!validateSquare(square)) {
    return "";
  }
  return `${square.col}${square.row + 1}`;
}

export function parseNotation(notation: string): Square | null {
  const [col, row] = notation.split("");
  const square = { col, row: parseInt(row) - 1 };

  if (!validateSquare(square)) {
    return null;
  }
  return square;
}

export function createBoard(): Board {
  return new Board([
    {
      a: piece("R", Color.White, new Straight()),
      b: piece("N", Color.White, new Knight()),
      c: piece("B", Color.White, new Diagonal()),
      d: piece("Q", Color.White, new Combined(new Straight(), new Diagonal())),
      e: piece(
        "K",
        Color.White,
        new Safe(
          new Combined(
            new Straight(1),
            new Diagonal(1),
            new Castle({ col: "e", row: 0 })
          )
        )
      ),
      f: piece("B", Color.White, new Diagonal()),
      g: piece("N", Color.White, new Knight()),
      h: piece("R", Color.White, new Straight()),
    },
    {
      a: piece("p", Color.White, new Forward(Direction.Up)),
      b: piece("p", Color.White, new Forward(Direction.Up)),
      c: piece("p", Color.White, new Forward(Direction.Up)),
      d: piece("p", Color.White, new Forward(Direction.Up)),
      e: piece("p", Color.White, new Forward(Direction.Up)),
      f: piece("p", Color.White, new Forward(Direction.Up)),
      g: piece("p", Color.White, new Forward(Direction.Up)),
      h: piece("p", Color.White, new Forward(Direction.Up)),
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
      a: piece("p", Color.Black, new Forward(Direction.Down)),
      b: piece("p", Color.Black, new Forward(Direction.Down)),
      c: piece("p", Color.Black, new Forward(Direction.Down)),
      d: piece("p", Color.Black, new Forward(Direction.Down)),
      e: piece("p", Color.Black, new Forward(Direction.Down)),
      f: piece("p", Color.Black, new Forward(Direction.Down)),
      g: piece("p", Color.Black, new Forward(Direction.Down)),
      h: piece("p", Color.Black, new Forward(Direction.Down)),
    },
    {
      a: piece("R", Color.Black, new Straight()),
      b: piece("N", Color.Black, new Knight()),
      c: piece("B", Color.Black, new Diagonal()),
      d: piece("Q", Color.Black, new Combined(new Straight(), new Diagonal())),
      e: piece(
        "K",
        Color.Black,
        new Safe(
          new Combined(
            new Straight(1),
            new Diagonal(1),
            new Castle({ col: "e", row: 7 })
          )
        )
      ),
      f: piece("B", Color.Black, new Diagonal()),
      g: piece("N", Color.Black, new Knight()),
      h: piece("R", Color.Black, new Straight()),
    },
  ]);
}

export function playSound(sound: string) {
  if (typeof Audio != "undefined") {
    new Audio(sound).play();
  }
}
