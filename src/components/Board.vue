<script setup lang="ts">
import { ref } from "vue";
import Square from "@/components/Square.vue";
import { createBoard } from "@/utils";

const board = ref(createBoard());
const selectedPiece = ref(null);
const availableMoves = ref([]);

function showAvailableMoves() {
    const selected = selectedPiece.value

    if (!selected || !selected.piece) {
        return
    }

    availableMoves.value = selected.piece.movement.getAvailableMoves(selected.square, board.value);
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
  const piece = board.value[source.row][source.col];
  board.value[dest.row][dest.col] = piece;
  board.value[source.row][source.col] = null;
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