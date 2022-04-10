<script setup lang="ts">
import { ref } from "vue";
import Square from "@/components/Square.vue";
import { parseSquare, createBoard } from "@/utils";

const squares = createBoard();
const selectedPiece = ref(null);

function selectPiece(square: Square) {
  selectedPiece.value = square;
}
function clearSelected() {
  selectedPiece.value = null;
}

function placePiece(destination: Square) {
  Move(selectedPiece.value, destination);
  clearSelected();
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
        @selected="selectPiece"
        @place="placePiece"
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
