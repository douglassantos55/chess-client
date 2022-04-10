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
});
