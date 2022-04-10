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
    await board.get(".piece").trigger("click");

    expect(board.vm.selectedPiece).toEqual({
      piece: { notation: "R", color: "white" },
      square: { col: "a", row: 0 },
    });
  });

  it("updates selected when another piece is selected", async () => {
    const board = mount(Board);
    await board.get(".piece").trigger("click");

    expect(board.vm.selectedPiece).toEqual({
      square: { col: "a", row: 0 },
      piece: { notation: "R", color: "white" },
    });

    await board.get(".d1").trigger("click");

    expect(board.vm.selectedPiece).toEqual({
      square: { col: "d", row: 0 },
      piece: { notation: "Q", color: "white" },
    });
  });

  it("clears selected piece on right click", () => {
    const board = mount(Board);
    board.vm.selectedPiece = {
      square: { col: "a", row: 0 },
      piece: { notation: "R", color: "white" },
    };

    board.trigger("contextmenu");
    expect(board.vm.selectedPiece).to.be.null;
  });

  it("moves selected piece", async () => {
    const board = mount(Board);

    await board.get(".piece.black").trigger("click");
    await board.get(".square.a5").trigger("click");

    expect(board.get(".square.a7").find(".piece").exists()).toBe(false);
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

  it("captures pieces", async () => {
    const board = mount(Board);
    await board.get(".e2").trigger("click");
    await board.get(".e7").trigger("click");

    const piece = board.get(".e7").find(".piece");

    expect(piece.exists()).toBe(true);
    expect(piece.classes()).toContain("white");
    expect(piece.classes()).not.toContain("black");
  });
});
