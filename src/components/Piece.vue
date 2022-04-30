<script setup lang="ts">
import { computed } from "vue";
import type { Piece } from "@/types";
import spritesheet from "@/assets/pieces.svg";

const props = defineProps<{
  piece: Piece;
}>();

const clips = {
  K: 0.07,
  Q: 1.07,
  B: 2.07,
  N: 3.07,
  R: 4.05,
  p: 5.05,
};

const styles = computed(() => {
  const idx = clips[props.piece.notation];
  return {
    "background-position-x": `-${75 * idx}px`,
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
  width: 64px;
  height: 64px;
  z-index: 1;
  cursor: grab;
  text-indent: -9999px;
  background-size: 450px;
}
.piece.white {
  background-position-y: -5px;
}
.piece.black {
  background-position-y: -82px;
}
</style>
