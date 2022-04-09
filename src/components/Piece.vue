<script setup lang="ts">
import type { Piece } from "@/types";

const props = defineProps<{
  piece: Piece;
}>();
</script>

<template>
  <span
    @click="$emit('selected', piece)"
    :class="`piece
    ${piece.color}`"
  >
    {{ piece.notation }}
  </span>
</template>

<style>
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
