import { describe, it, expect } from "vitest";

import { createBoard } from "@/utils";
import { mount } from "@vue/test-utils";
import Board from "@/components/Board.vue";

describe("Board", () => {
  it("starts with pieces at initial position", () => {
    const wrapper = mount(Board);
    expect(createBoard().value).toEqual(wrapper.vm.squares);
  });

  it("selects pieces", async () => {
    const board = mount(Board);
    const piece = board.get(".piece");

    await piece.trigger("click");
    expect(board.vm.selectedPiece).toEqual({ col: "a", row: 0 });
  });

  it("updates selected when another piece is selected", async () => {
    const board = mount(Board);

    await board.get(".piece").trigger("click");
    expect(board.vm.selectedPiece).toEqual({ col: "a", row: 0 });

    await board.get(".piece.black").trigger("click");
    expect(board.vm.selectedPiece).toEqual({ col: "a", row: 6 });
  });

  it("clears selected piece", () => {
    const board = mount(Board);
    board.vm.selectedPiece = { col: "a", row: 0 };

    board.trigger("contextmenu");
    expect(board.vm.selectedPiece).to.be.null;
  });

  it("moves selected piece", async () => {
    const board = mount(Board);

    await board.get(".piece.black").trigger("click");
    await board.get(".square.a5").trigger("click");

    expect(board.get(".square.a5").text()).toContain("p");
    expect(board.get(".square.a5").html()).toContain(
      'span class="piece black"'
    );
  });

  it("clears selected piece after moving", async () => {
    const board = mount(Board);

    await board.get(".piece.black").trigger("click");
    await board.get(".square.a5").trigger("click");

    expect(board.vm.selectedPiece).toBe(null);
  });
});
