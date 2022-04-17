<script setup lang="ts">
import { ref } from "vue";
import Square from "@/components/Square.vue";
import { playSound, createBoard } from "@/utils";
import moveAudio from "../assets/move.webm";
import captureAudio from "../assets/capture.webm";
import checkAudio from "../assets/move-check.webm";

const inCheck = ref(false);
const board = ref(createBoard());
const selectedPiece = ref(null);
const availableMoves = ref([]);

function showAvailableMoves() {
  const { piece, square } = selectedPiece.value;

  if (piece && square) {
    let moves = piece.movement.getAvailableMoves(square, board.value).flat();

    // make it as if the piece was not there so that threats go through to the
    // squares behind, preventing the piece from moving and exposing the king
    // by filtering out the moves that are not within the threatened squares
    board.value[square.row][square.col] = null;
    const threatenedSquares = getThreats()[piece.color];
    board.value[square.row][square.col] = piece;

    if (threatenedSquares && piece.notation !== "K") {
      moves = moves.filter((square: Square) => {
        for (const threat of threatenedSquares.flat()) {
          if (square.col === threat.col && square.row === threat.row) {
            return true;
          }
        }
        return false;
      });
    }

    availableMoves.value = moves;
  }
}

function selectedSquare({ piece, square }) {
  if (selectedPiece.value && selectedPiece.value.piece) {
    if (!piece || piece.color != selectedPiece.value.piece.color) {
      Move(selectedPiece.value.square, square);
      clearSelected();
    } else {
      selectedPiece.value = { piece, square };
      showAvailableMoves();
    }
  } else if (piece) {
    selectedPiece.value = { piece, square };
    showAvailableMoves();
  }
}

function clearSelected() {
  selectedPiece.value = null;
  availableMoves.value = [];
}

function Move(source: Square, dest: Square) {
  const available = availableMoves.value.find(
    (square: Square) => square.col == dest.col && square.row == dest.row
  );

  if (available) {
    const piece = board.value[source.row][source.col];
    const captured = board.value[dest.row][dest.col];

    board.value[dest.row][dest.col] = piece;
    board.value[source.row][source.col] = null;

    piece.moveCount++;
    checkForCheck();

    if (!inCheck.value) {
      if (captured) {
        playSound(captureAudio);
      } else {
        playSound(moveAudio);
      }
    }
  }
}

function getThreats(): Square[][] {
  const threats = {};
  for (const row in board.value) {
    for (const col in board.value[row]) {
      const target = board.value[parseInt(row)][col];
      if (target != null) {
        const captures = target.movement.getCaptureSquares(
          { col, row: parseInt(row) },
          board.value
        );

        captures.forEach((squares: Square[]) => {
          for (const square of squares) {
            const piece = board.value[square.row][square.col];
            if (piece && piece.color != target.color && piece.notation == "K") {
              if (!threats[piece.color]) {
                threats[piece.color] = [];
              }
              threats[piece.color].push([
                { col, row: parseInt(row) },
                ...squares,
              ]);
            }
          }
        });
      }
    }
  }
  return threats;
}

function checkForCheck() {
  inCheck.value = false;

  if (Object.values(getThreats()).length !== 0) {
    inCheck.value = true;
    playSound(checkAudio);
  }
}
</script>

<template>
  <div class="board" @contextmenu.prevent="clearSelected">
    <div class="row" v-for="(row, idx) in board" :key="idx" :data-row="idx + 1">
      <Square
        v-for="(piece, col) in row"
        :key="`${col}${idx}`"
        :piece="piece"
        :col="col"
        :row="idx"
        :availableMoves="availableMoves"
        @selected="selectedSquare"
      />
    </div>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column-reverse;
}
.row {
  display: flex;
  background: #eee;
  position: relative;
}
.row:first-of-type .square:after {
  bottom: 5px;
  right: 5px;
  z-index: 1;
  color: #444;
  display: block;
  position: absolute;
  content: attr(data-square);
}
.row:before {
  top: 5px;
  left: 5px;
  z-index: 1;
  color: #444;
  display: block;
  position: absolute;
  content: attr(data-row);
}
.row:nth-child(odd) .square:nth-child(odd),
.row:nth-child(even) .square:nth-child(even) {
  background: #76adb7;
}
</style>
