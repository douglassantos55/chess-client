import type { Color, Piece, Square } from "@/types";
import { ref } from "vue";

export function piece(notation: string, color: Color): Piece {
  return { color, notation };
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

export function createBoard() {
  return ref([
    {
      a: piece("R", "white"),
      b: piece("N", "white"),
      c: piece("B", "white"),
      d: piece("Q", "white"),
      e: piece("K", "white"),
      f: piece("B", "white"),
      g: piece("N", "white"),
      h: piece("R", "white"),
    },
    {
      a: piece("p", "white"),
      b: piece("p", "white"),
      c: piece("p", "white"),
      d: piece("p", "white"),
      e: piece("p", "white"),
      f: piece("p", "white"),
      g: piece("p", "white"),
      h: piece("p", "white"),
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
      a: piece("p", "black"),
      b: piece("p", "black"),
      c: piece("p", "black"),
      d: piece("p", "black"),
      e: piece("p", "black"),
      f: piece("p", "black"),
      g: piece("p", "black"),
      h: piece("p", "black"),
    },
    {
      a: piece("R", "black"),
      b: piece("N", "black"),
      c: piece("B", "black"),
      d: piece("Q", "black"),
      e: piece("K", "black"),
      f: piece("B", "black"),
      g: piece("N", "black"),
      h: piece("R", "black"),
    },
  ]);
}
