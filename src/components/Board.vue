<script setup lang="ts">
import { parseSquare, createBoard } from "@/utils";

const squares = createBoard();

function Move(from: string, to: string) {
  const source = parseSquare(from);
  const dest = parseSquare(to);

  const piece = squares.value[source.row][source.col];
  squares.value[dest.row][dest.col] = piece;
  squares.value[source.row][source.col] = null;
}
</script>

<template>
  <div class="board">
    <div class="row" v-for="row in squares" :key="row">
      <div class="square" v-for="col in row" :key="`${col}${row}`">
        <span :class="`piece ${col.color}`" v-if="col">{{ col.notation }}</span>
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
.piece {
  height: 100%;
  display: flex;
  font-size: 35px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  -webkit-text-stroke: 1px #666;
}
.piece.white {
  -webkit-text-fill-color: #fff;
}
.piece.black {
  -webkit-text-fill-color: #222;
}
</style>
