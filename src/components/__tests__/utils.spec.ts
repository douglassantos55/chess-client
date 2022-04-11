import { describe, it, expect } from "vitest";
import { createBoard, parseSquare, piece } from "@/utils";
import Straight from "@/straight";
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
        b: piece("N", "white", new Forward(Direction.Up)),
        c: piece("B", "white", new Forward(Direction.Up)),
        d: piece("Q", "white", new Forward(Direction.Up)),
        e: piece("K", "white", new Forward(Direction.Up)),
        f: piece("B", "white", new Forward(Direction.Up)),
        g: piece("N", "white", new Forward(Direction.Up)),
        h: piece("R", "white", new Straight()),
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
        a: piece("R", "black", new Straight()),
        b: piece("N", "black", new Forward(Direction.Down)),
        c: piece("B", "black", new Forward(Direction.Down)),
        d: piece("Q", "black", new Forward(Direction.Down)),
        e: piece("K", "black", new Forward(Direction.Down)),
        f: piece("B", "black", new Forward(Direction.Down)),
        g: piece("N", "black", new Forward(Direction.Down)),
        h: piece("R", "black", new Straight()),
      },
    ]);
  });
});
