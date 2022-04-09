<script setup lang="ts">
import { ref } from "vue";
import Piece from "@/components/Piece.vue";
import { parseSquare, createBoard } from "@/utils";

const squares = createBoard();
const selectedPiece = ref(null);

function selectPiece(piece: Piece) {
  selectedPiece.value = piece;
}
function clearSelected() {
    selectedPiece.value = null
}

function Move(from: string, to: string) {
  const source = parseSquare(from);
  const dest = parseSquare(to);

  const piece = squares.value[source.row][source.col];
  squares.value[dest.row][dest.col] = piece;
  squares.value[source.row][source.col] = null;
}
</script>

<template>
  <div class="board" @contextmenu.prevent="clearSelected">
    <div class="row" v-for="row in squares" :key="row">
      <div class="square" v-for="col in row" :key="`${col}${row}`">
        <Piece :piece="col" v-if="col" @selected="selectPiece" />
      </div>
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
