import { describe, it, expect } from "vitest";

import { piece, createBoard } from "@/utils";
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
        const expected = piece.getCurrentComponent()?.props.piece

        await piece.trigger("click");
        expect(board.vm.selectedPiece).toEqual(expected)
    });

    it('updates selected when another piece is selected', async () => {
        const board = mount(Board);

        await board.get(".piece").trigger('click');
        expect(board.vm.selectedPiece).toEqual({
            color: 'white',
            notation: 'R',
        })

        await board.get(".piece.black").trigger('click');
        expect(board.vm.selectedPiece).toEqual({
            color: 'black',
            notation: 'p',
        })
    })

    it('clears selected piece', () => {
        const board = mount(Board)
        board.vm.selectedPiece = { color: 'white', notation: 'K' }

        board.trigger('contextmenu')
        expect(board.vm.selectedPiece).to.be.null
    })

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
