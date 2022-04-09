import { describe, it, expect } from "vitest";
import { createBoard, parseSquare, piece } from "@/utils";

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
    expect(createBoard().value).toEqual([
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
  });
});
