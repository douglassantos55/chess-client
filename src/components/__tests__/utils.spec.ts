import { describe, it, expect } from "vitest";
import { createBoard, parseSquare, piece } from "@/utils";
import Straight from "@/straight";
import Combined from "@/combined";
import Diagonal from "@/diagonal";
import Knight from "@/knight";
import Safe from "@/safe";
import Forward, { Direction } from "@/forward";
import { Color } from "@/types";

describe("utils", () => {
  it("parseSquare", () => {
    expect(parseSquare("a1")).toEqual({ col: "a", row: 0 });
    expect(parseSquare("h8")).toEqual({ col: "h", row: 7 });
    expect(parseSquare("e5")).toEqual({ col: "e", row: 4 });
    expect(parseSquare("f7")).toEqual({ col: "f", row: 6 });

    expect(parseSquare("a9")).to.null;
    expect(parseSquare("a0")).to.null;
    expect(parseSquare("i3")).to.null;
    expect(parseSquare("h9")).to.null;
  });

  it("creates board at initial position", () => {
    expect(createBoard()).toEqual([
      {
        a: piece("R", Color.White, new Straight()),
        b: piece("N", Color.White, new Knight()),
        c: piece("B", Color.White, new Diagonal()),
        d: piece(
          "Q",
          Color.White,
          new Combined(new Straight(), new Diagonal())
        ),
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
        d: piece(
          "Q",
          Color.Black,
          new Combined(new Straight(), new Diagonal())
        ),
        e: piece(
          "K",
          Color.Black,
          new Safe(new Combined(new Straight(1), new Diagonal(1)))
        ),
        f: piece("B", Color.Black, new Diagonal()),
        g: piece("N", Color.Black, new Knight()),
        h: piece("R", Color.Black, new Straight()),
      },
    ]);
  });
});
