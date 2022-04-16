<script setup lang="ts">
import { ref, watch } from "vue";
import Square from "@/components/Square.vue";
import { createBoard } from "@/utils";
import checkAudio from "../assets/move-check.webm";

const inCheck = ref(false);
const board = ref(createBoard());
const selectedPiece = ref(null);
const availableMoves = ref([]);
const threats = ref([]);

watch(inCheck, (inCheck) => {
  if (inCheck && typeof Audio != "undefined") {
    new Audio(checkAudio).play();
  }
});

function showAvailableMoves() {
  const selected = selectedPiece.value;

  if (!selected || !selected.piece) {
    return;
  }

  let moves = selected.piece.movement
    .getAvailableMoves(selected.square, board.value)
    .flat();

  if (threats.value.length > 0) {
    moves = moves.filter((square: Square) => {
      for (const threat of threats.value.flat()) {
        if (square.col === threat.col && square.row === threat.row) {
          return true;
        }
      }
      return false;
    });
  }

  availableMoves.value = moves;
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
    board.value[dest.row][dest.col] = piece;
    board.value[source.row][source.col] = null;

    checkForCheck();
  }
}

function checkForCheck() {
  inCheck.value = false;
  threats.value = [];

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
              threats.value.push([{ col, row: parseInt(row) }]);
              threats.value.push(squares);
            }
          }
        });
      }
    }
  }

  if (threats.value.length !== 0) {
    inCheck.value = true;
  }
}
</script>

<template>
  <div class="board" @contextmenu.prevent="clearSelected">
    <div class="row" v-for="(row, idx) in board" :key="idx">
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
.row {
  display: flex;
  background: #eee;
}
.square {
  width: 82px;
  height: 82px;
}
.row:nth-child(odd) .square:nth-child(even),
.row:nth-child(even) .square:nth-child(odd) {
  background: #76adb7;
}
</style>
