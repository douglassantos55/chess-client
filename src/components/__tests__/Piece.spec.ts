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
});
