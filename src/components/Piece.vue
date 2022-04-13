<script setup lang="ts">
import type { Piece } from "@/types";

defineProps<{
  piece: Piece;
}>();
</script>

<template>
  <span :class="`piece ${piece.color}`">
    {{ piece.notation }}
  </span>
</template>

<style scoped>
.piece {
  z-index: 1;
  cursor: grab;
  font-size: 35px;
  font-weight: bold;
  -webkit-text-stroke: 1px #666;
}
.piece.white {
  -webkit-text-fill-color: #fff;
}
.piece.black {
  -webkit-text-fill-color: #222;
}
</style>
