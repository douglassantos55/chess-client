<script setup lang="ts">
import { computed } from "vue";
import type { Square, Piece as PieceType } from "@/types";
import Piece from "@/components/Piece.vue";

const props = defineProps<{
  piece?: PieceType;
  col: string;
  row: number;
}>();

const emit = defineEmits<{
  (e: "selected", square: Square): void;
  (e: "place", square: Square): void;
}>();

const notation = computed(() => props.col + (props.row + 1));

function select() {
  const square = { col: props.col, row: props.row };

  if (props.piece) {
    emit("selected", square);
  } else {
    emit("place", square);
  }
}
</script>

<template>
  <div :class="`square ${notation}`" @click.self="select">
    <Piece :piece="piece" v-if="piece" @click.self="select" />
  </div>
</template>
