import { describe, it, expect } from "vitest";

import { piece, createBoard } from "@/utils";
import { mount } from "@vue/test-utils";
import Board from "@/components/Board.vue";

describe("Board", () => {
  it("starts with pieces at initial position", () => {
    const wrapper = mount(Board);
    expect(createBoard().value).toEqual(wrapper.vm.squares);
  });

  it("renders correctly", () => {
    const board = mount(Board);
    expect(board).toMatchSnapshot();
  });

  it("moves pieces", () => {
    const board = mount(Board);

    board.vm.Move("e2", "e4");
    board.vm.Move("e7", "e5");
    board.vm.Move("b1", "c3");
    board.vm.Move("g8", "f6");

    expect(board.vm.squares[1]["e"]).to.be.null;
    expect(board.vm.squares[3]["e"]).toEqual(piece("p", "white"));

    expect(board.vm.squares[6]["e"]).to.be.null;
    expect(board.vm.squares[4]["e"]).toEqual(piece("p", "black"));

    expect(board.vm.squares[0]["b"]).to.be.null;
    expect(board.vm.squares[2]["c"]).toEqual(piece("N", "white"));

    expect(board.vm.squares[7]["g"]).to.be.null;
    expect(board.vm.squares[5]["f"]).toEqual(piece("N", "black"));
  });
});
