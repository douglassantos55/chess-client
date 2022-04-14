import { describe, it, expect } from "vitest";
import { createBoard, parseSquare, piece } from "@/utils";
import Straight from "@/straight";
import Combined from "@/combined";
import Diagonal from "@/diagonal";
import Knight from "@/knight";
import Forward, { Direction } from "@/forward";

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
        a: piece("R", "white", new Straight()),
        b: piece("N", "white", new Knight()),
        c: piece("B", "white", new Diagonal()),
        d: piece("Q", "white", new Combined(new Straight(), new Diagonal())),
        e: piece("K", "white", new Combined(new Straight(1), new Diagonal(1))),
        f: piece("B", "white", new Diagonal()),
        g: piece("N", "white", new Knight()),
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
        a: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "a", row: 6 })
        ),
        b: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "b", row: 6 })
        ),
        c: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "c", row: 6 })
        ),
        d: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "d", row: 6 })
        ),
        e: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "e", row: 6 })
        ),
        f: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "f", row: 6 })
        ),
        g: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "g", row: 6 })
        ),
        h: piece(
          "p",
          "black",
          new Forward(Direction.Down, { col: "h", row: 6 })
        ),
      },
      {
        a: piece("R", "black", new Straight()),
        b: piece("N", "black", new Knight()),
        c: piece("B", "black", new Diagonal()),
        d: piece("Q", "black", new Combined(new Straight(), new Diagonal())),
        e: piece("K", "black", new Combined(new Straight(1), new Diagonal(1))),
        f: piece("B", "black", new Diagonal()),
        g: piece("N", "black", new Knight()),
        h: piece("R", "black", new Straight()),
      },
    ]);
  });
});
