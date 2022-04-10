import { expect, describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import Square from "@/components/Square.vue";

describe("Square", () => {
  it("renders piece", () => {
    const square = mount(Square, {
      props: {
        row: 6,
        col: "h",
        piece: { notation: "R", color: "black" },
      },
    });

    expect(square.text()).toContain("R");
  });

  it("contains notation", () => {
    const square = mount(Square, {
      props: { row: 6, col: "h" },
    });

    expect(square.classes()).toContain("h7");
    expect(square.classes()).toContain("square");
  });

  it("does not render piece if empty", () => {
    const square = mount(Square, {
      props: { row: 6, col: "h" },
    });

    expect(square.find(".piece").exists()).toBe(false);
  });

  it("dispatches `selected` if empty", () => {
    const square = mount(Square, {
      props: { row: 6, col: "e" },
    });

    square.get(".square").trigger("click");

    expect(square.emitted().selected).toHaveLength(1);
    expect(square.emitted().selected[0]).toEqual([
      { piece: undefined, square: { col: "e", row: 6 } },
    ]);
  });

  it("dispatches `selected` if not empty", () => {
    const square = mount(Square, {
      props: { row: 0, col: "c", piece: { notation: "K", color: "white" } },
    });

    square.get(".square").trigger("click");
    expect(square.emitted().selected).toHaveLength(1);
    expect(square.emitted().selected[0]).toEqual([
      {
        piece: { notation: "K", color: "white" },
        square: { col: "c", row: 0 },
      },
    ]);
  });

  it("dispatches `selected` if click on piece", () => {
    const square = mount(Square, {
      props: { row: 2, col: "g", piece: { notation: "R", color: "black" } },
    });

    square.get(".piece").trigger("click");
    expect(square.emitted().selected).toHaveLength(1);
    expect(square.emitted().selected[0]).toEqual([
      {
        piece: { notation: "R", color: "black" },
        square: { col: "g", row: 2 },
      },
    ]);
  });
});
