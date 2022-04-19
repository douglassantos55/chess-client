import { describe, it, expect } from "vitest";
import { parseNotation, parseSquare } from "@/utils";

describe("utils", () => {
  it("parseNotation", () => {
    expect(parseNotation("a1")).toEqual({ col: "a", row: 0 });
    expect(parseNotation("h8")).toEqual({ col: "h", row: 7 });
    expect(parseNotation("e5")).toEqual({ col: "e", row: 4 });
    expect(parseNotation("f7")).toEqual({ col: "f", row: 6 });

    expect(parseNotation("a9")).to.null;
    expect(parseNotation("a0")).to.null;
    expect(parseNotation("i3")).to.null;
    expect(parseNotation("h9")).to.null;
  });

  it("parseSquare", () => {
    expect(parseSquare({ col: "h", row: 0 })).toEqual("h1");
    expect(parseSquare({ col: "a", row: 0 })).toEqual("a1");
    expect(parseSquare({ col: "a", row: 7 })).toEqual("a8");
    expect(parseSquare({ col: "d", row: 5 })).toEqual("d6");

    expect(parseSquare({ col: "d", row: 8 })).toEqual("");
    expect(parseSquare({ col: "i", row: 2 })).toEqual("");
  });
});
