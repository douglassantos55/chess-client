<script setup lang="ts">
import { computed } from "vue";
import type { Piece } from "@/types";
import spritesheet from "@/assets/pieces.svg";

const props = defineProps<{
  piece: Piece;
}>();

const clips = {
  K: 0.05,
  Q: 1.03,
  B: 2,
  N: 3,
  R: 3.96,
  p: 4.94,
};

const styles = computed(() => {
  const idx = clips[props.piece.notation];
  return {
    "background-position-x": `-${85 * idx}px`,
    "background-image": `url(${spritesheet})`,
  };
});
</script>

<template>
  <span :class="`piece ${piece.color}`" :style="styles">{{
    piece.notation
  }}</span>
</template>

<style scoped>
.piece {
  width: 74px;
  height: 74px;
  z-index: 1;
  cursor: grab;
  text-indent: -9999px;
  background-size: 500px;
}
.piece.white {
  background-position-y: -5px;
}
.piece.black {
  background-position-y: -90px;
}
</style>
