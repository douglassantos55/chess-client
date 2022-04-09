import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Piece from "@/components/Piece.vue";

describe("Piece", () => {
  it("renders the piece", () => {
    const piece = mount(Piece, {
      props: {
        piece: { notation: "K", color: "black" },
      },
    });

    expect(piece.text()).toContain("K");
    expect(piece.classes()).toContain("piece");
    expect(piece.classes()).toContain("black");
  });

  it("dispatches selected event", async () => {
    const piece = mount(Piece, {
      props: {
        piece: { notation: "K", color: "black" },
      },
    });

    await piece.trigger("click");
    expect(piece.emitted().selected).toHaveLength(1);
    expect(piece.emitted().selected[0]).toEqual([
      { notation: "K", color: "black" },
    ]);
  });
});
