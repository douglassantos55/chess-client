<script setup lang="ts">
import { ref } from "vue";
import Square from "@/components/Square.vue";
import { createBoard } from "@/utils";

const squares = createBoard();
const selectedPiece = ref(null);

function selectedSquare({ piece, square }) {
  if (selectedPiece.value && selectedPiece.value.piece) {
    if (!piece || piece.color != selectedPiece.value.piece.color) {
      Move(selectedPiece.value.square, square);
      clearSelected();
    } else {
      selectedPiece.value = { piece, square };
    }
  } else if (piece) {
    selectedPiece.value = { piece, square };
  }
}

function clearSelected() {
  selectedPiece.value = null;
}

function Move(source: Square, dest: Square) {
  const piece = squares.value[source.row][source.col];
  squares.value[dest.row][dest.col] = piece;
  squares.value[source.row][source.col] = null;
}
</script>

<template>
  <div class="board" @contextmenu.prevent="clearSelected">
    <div class="row" v-for="(row, idx) in squares" :key="idx">
      <Square
        v-for="(piece, col) in row"
        :key="`${col}${idx}`"
        :piece="piece"
        :col="col"
        :row="idx"
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
